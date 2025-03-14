/*Write an After Effects script that duplicates the selected composition.
Use a ScriptUI window to prompt the user for text input.
Split the user-provided text by line breaks.
Create a new duplicated composition for each line of text.
Update the "Text" layer in each duplicated composition with the corresponding line.
Add a comment to each duplicated composition containing the respective text line.*/



var proj = app.project;
var selectedComp = app.project.activeItem;

if (selectedComp && selectedComp instanceof CompItem) {
    app.beginUndoGroup("Duplicate Comp and Version Out Text");

    // Create ScriptUI window
    var win = new Window("dialog", "Enter Text");
    win.orientation = "column";
    
    var inputText = win.add("edittext", undefined, "", {multiline: true, scrollable: true});
    inputText.preferredSize = [300, 100];
    
    var btnGroup = win.add("group");
    btnGroup.orientation = "row";
    var okBtn = btnGroup.add("button", undefined, "OK");
    var cancelBtn = btnGroup.add("button", undefined, "Cancel");
    
    var userInput = "";
    okBtn.onClick = function() {
        userInput = inputText.text;
        win.close();
    };
    cancelBtn.onClick = function() {
        win.close();
    };
    
    win.show();
    
    if (!userInput) {
        alert("No input provided. Exiting script.");
        app.endUndoGroup();
    } else {
        var textLines = userInput.split(/\r?\n/); // Split input by line breaks
        
        for (var i = 0; i < textLines.length; i++) {
            var newComp = selectedComp.duplicate();
            newComp.name = selectedComp.name + "_v" + (i + 1);

            var textLayer = null;
            
            // Find the text layer named "Text"
            for (var j = 1; j <= newComp.numLayers; j++) {
                if (newComp.layer(j).name === "Text" && newComp.layer(j) instanceof TextLayer) {
                    textLayer = newComp.layer(j);
                    break;
                }
            }
            
            if (textLayer) {
                var textProp = textLayer.property("Source Text");
                if (textProp) {
                    textProp.setValue(textLines[i]);
                }
            } else {
                alert("No text layer named 'Text' found in " + newComp.name);
            }

            // Add comment to the duplicated comp
            newComp.comment = "''" + textLines[i] + "''" ;
        }
    }
    
    app.endUndoGroup();
} else {
    alert("Please select a composition before running the script.");
}
