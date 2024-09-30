
// structures
// var str = "master \ 2 \ 3 \"
app.beginUndoGroup('');
// housekeeping
var thisComp = app.project;
// Read file
//var txt = File.openDialog("Please select .txt file");
var txt = File("/Users/ddu/Desktop/sandbox/folderStructureCode.txt");
var readOK = txt.open("r");

// variables
var content;
var itemsArray;

var newFolder;
var rFolder;
var s1Folder;
var s2Folder

// Read txt file> create an array based on line feed
if(readOK){
    content = txt.read();
	itemsArray = content.split(/\n|\r/);
}

// create folders
for(var i = 0; i<itemsArray.length; i++){
    newFolder = thisComp.items.addFolder(itemsArray[i].toString()) // Create a folder
    if(newFolder.name.match(/\t/)!=0){ // if tab not exist, it is a rootFolder
        rFolder = newFolder; // probem

    }

    if(newFolder.name.match(/\t{1}/)==0 &&newFolder.name.match(/\t{2}/)!=0){ // if tab exist, it is a s1Folder
        s1Folder = newFolder;
        s1Folder.parentFolder = rFolder;
        s1Folder.name =  s1Folder.name.slice(1) // remove tab
    }
    if(newFolder.name.match(/\t{2}/)==0){ // if tab exist, it is a s2Folder
        s2Folder = newFolder;
        s2Folder.parentFolder = s1Folder;
        s2Folder.name =  s2Folder.name.slice(2) // remove tab
    }
}

app.endUndoGroup();
