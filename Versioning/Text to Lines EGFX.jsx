// AE Script UI: Splits provided text by line breaks, delimited by commas (e.g., John Doe, CEO, Company X).
// Searches for Essential Graphic Properties named "Name", "Title", and "Company" in the selected layer,
// then replaces their values with the user-provided text.
// Includes input boxes for naming convention prefix and suffix.
// Creates a duplicate of the composition with the provided text as a comment.

{
    function showUI() {
        var win = new Window("dialog", "Update Essential Graphics Properties");
        win.alignChildren = "left";

        // Input field for user text
        win.add("statictext", undefined, "Enter Text (comma-delimited, one set per line):");
        var inputText = win.add("edittext", [0, 0, 500, 300], "Jane Doe, Really Important Person, CompanyXYZ", { multiline: true });

        // Input fields for naming convention prefix and suffix
        win.add("statictext", undefined, "Name Prefix:");
        var prefixInput = win.add("edittext", [0, 0, 500, 25], "");

        win.add("statictext", undefined, "Name Suffix:");
        var suffixInput = win.add("edittext", [0, 0, 500, 25], "");

        // Apply Button
        var applyBtn = win.add("button", undefined, "Apply");

        // Button click handler
        applyBtn.onClick = function () {
            var userText = inputText.text.trim();
            var prefix = prefixInput.text.trim();
            var suffix = suffixInput.text.trim();

            if (userText) { // Allow empty prefix/suffix without triggering an error
                try {
                    app.beginUndoGroup("Update Essential Graphics Properties");
                    applyTextToEGProperties(userText, prefix, suffix);
                    app.endUndoGroup();
                    alert("Properties updated successfully.");
                } catch (err) {
                    alert("Error: " + err.message);
                }
                win.close();
            } else {
                alert("Please provide the text input.");
            }
        };

        win.center();
        win.show();
    }

    function applyTextToEGProperties(text, prefix, suffix) {
        var textArray = text.split(/\r?\n/);
        var comp = app.project.activeItem;

        if (!(comp instanceof CompItem)) {
            alert("Please select a composition.");
            return;
        }

        for (var i = 0; i < textArray.length; i++) {
            var line = textArray[i].split(",").map(function (item) {
                return item.trim();
            });

            var name = line[0] || "";
            var title = line[1] || "";
            var company = line[2] || "";

            var layer = comp.layer(i + 1); // Assumes sequential layers
            if (layer && layer.property("Essential Properties")) {
                var essentialProps = layer.property("Essential Properties");

                var propName = essentialProps.property("Line 1");
                var propTitle = essentialProps.property("Line 2");
                var propCompany = essentialProps.property("Line 3");

                if (propName) propName.setValue(name);
                if (propTitle) propTitle.setValue(title);
                if (propCompany) propCompany.setValue(company);

                // Construct new name for the duplicated composition
                var newName = constructName(comp.name, prefix, suffix, i + 1, name);
                duplicateComp(comp, newName, text);
            }
        }
    }

    function constructName(baseName, prefix, suffix, idx, propName) {
        var newName = "";

        if (prefix) newName += prefix + "_";
        newName += baseName + "_" + idx + "_" + propName;
        if (suffix) newName += "_" + suffix;

        return newName;
    }

    function duplicateComp(comp, newName, comment) {
        var duplicateComp = comp.duplicate();
        duplicateComp.name = newName;
        duplicateComp.comment = comment;
    }

    // Call the UI function to display the dialog
    showUI();
}
