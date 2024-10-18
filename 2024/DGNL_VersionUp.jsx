// After Effects Script with ScriptUI to Version Up AEP and Manage Folders

{
    // Function to create the ScriptUI panel
    function createUI(thisObj) {
        var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "AEP Version Up", undefined, { resizeable: true });

        // UI Elements
        var res =
            "group { \
                orientation:'column', alignment:['fill', 'top'], \
                folderGroup: Group { orientation: 'row', alignment: ['fill', 'top'], \
                    locateAEPBtn: Button { text:'Locate AEP Folder', alignment:['fill', 'center'] }, \
                    folderBtn1: Button { text:'Folder 1', alignment:['fill', 'center'] }, \
                    folderBtn2: Button { text:'Folder 2', alignment:['fill', 'center'] }, \
                    folderBtn3: Button { text:'Folder 3', alignment:['fill', 'center'] }, \
                    folderBtn4: Button { text:'Folder 4', alignment:['fill', 'center'] }, \
                }, \
                versionGroup: Group { orientation: 'row', alignment: ['fill', 'top'], \
                    versionFormatLabel: StaticText { text:'Version Format:' }, \
                    versionFormatDropdown: DropDownList { properties:{ items:['MMDDYY', 'YYMMDD', 'v01'] }, alignment:['fill', 'center'] }, \
                }, \
                versionUpBtn: Button { text:'Version Up AEP', alignment:['fill', 'center'] }, \
            }";

        myPanel.grp = myPanel.add(res);

        // Set default dropdown selection
        myPanel.grp.versionGroup.versionFormatDropdown.selection = 2;

        // Event Handlers
        myPanel.grp.folderGroup.locateAEPBtn.onClick = function () {
            var aepFolder = Folder.selectDialog("Select AEP Folder");
            if (aepFolder) {
                alert("AEP Folder selected: " + aepFolder.fsName);
                // Set the path to use in versioning or other functions
                app.settings.saveSetting("AEPVersionUpScript", "AEPFolderPath", aepFolder.fsName);
            }
        };

        myPanel.grp.versionUpBtn.onClick = function () {
            versionUpProject(myPanel.grp.versionGroup.versionFormatDropdown.selection.text);
        };

        myPanel.layout.layout(true);
        return myPanel;
    }

    // Function to get the current date in specified formats
    function getDateString(format) {
        var date = new Date();
        var mm = String(date.getMonth() + 1).padStart(2, '0'); // Month (01-12)
        var dd = String(date.getDate()).padStart(2, '0');      // Day (01-31)
        var yy = String(date.getFullYear()).substring(2);      // Year (last two digits)

        if (format === "MMDDYY") {
            return mm + dd + yy;
        } else if (format === "YYMMDD") {
            return yy + mm + dd;
        }
    }

    // Function to increment version number
    function incrementVersion(version) {
        var newVersion = parseInt(version.slice(1)) + 1;
        return 'v' + String(newVersion).padStart(2, '0');
    }

    // Function to version up the AEP file
    function versionUpProject(selectedFormat) {
        var project = app.project;
        if (!project.file) {
            alert("Please save your project first.");
            return;
        }

        var currentPath = project.file.fsName;
        var archiveFolder = new Folder(project.file.parent.fsName + "/Archive");

        if (!archiveFolder.exists) {
            archiveFolder.create();
        }

        var baseName = decodeURIComponent(project.file.name).split('.')[0];
        var newVersionName;
        var currentVersion;

        // Detect current version format and increment
        if (selectedFormat === "MMDDYY" || selectedFormat === "YYMMDD") {
            currentVersion = getDateString(selectedFormat);
            newVersionName = baseName + "_" + currentVersion + ".aep";
        } else if (selectedFormat === "v01") {
            var versionRegex = /v(\d{2})$/;
            var matches = baseName.match(versionRegex);
            if (matches) {
                currentVersion = matches[0];
                var newVersion = incrementVersion(currentVersion);
                newVersionName = baseName.replace(versionRegex, newVersion) + ".aep";
            } else {
                newVersionName = baseName + "_v01.aep";
            }
        }

        // Move the current project to archive folder
        var archivedFile = new File(archiveFolder.fsName + "/" + project.file.name);
        project.file.copy(archivedFile);

        // Save the project with the new version name
        var newFile = new File(project.file.parent.fsName + "/" + newVersionName);
        project.save(newFile);

        alert("Versioned up to: " + newVersionName + "\nOld version moved to Archive folder.");
    }

    // Show UI
    var myScriptUI = createUI(this);
    if (myScriptUI instanceof Window) {
        myScriptUI.center();
        myScriptUI.show();
    }
}
