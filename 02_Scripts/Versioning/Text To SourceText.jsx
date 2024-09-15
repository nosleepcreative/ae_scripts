/*
Script Name: nsc_TextToSourceText
Description: This script duplicates a selected text layer and updates the source text of the Essential Property "Text Input" based on user-provided text.
Author: Desmond Du
Website: duitbetter.com, https://github.com/nosleepcreative, https://www.youtube.com/@NoSleepCreative
Version: 1.3.2
Date: October 25, 2023
Copyright (c) 2023 nosleepcreative (Desmond Du). All rights reserved

Change Log
v1.2. Added precomp button and function
v1.3. Increase size of dialog box, text in comments, and versioning comps into a newly created folder 
v1.3.1 Fixed MOGRT Versioning
v1.3.2 Added variable EPText to specify Essential Props Text Property

Future improvements
- Add number padding, start number from user input
- Allowed delimiter for multiple line versioning: Name Role
- Select properties to source text
- search for Versioning folder, else use it
- create version folder based on where comp is, label folder cyan
- include line break in text input

*/

// DIALOG
// ======
var dialog = new Window("dialog");
dialog.text = "Text Layer Generator";
dialog.orientation = "column";
dialog.alignChildren = ["center", "top"];
dialog.spacing = 10;
dialog.margins = 16;

var infoText = dialog.add("group");
infoText.orientation = "column";
infoText.alignChildren = ["left", "center"];
infoText.spacing = 0;

infoText.add("statictext", undefined, "Insert your text below. Each line will be a new text layer");

var prefixGroup = dialog.add("group");
prefixGroup.orientation = "row";
prefixGroup.alignChildren = ["left", "center"];
prefixGroup.spacing = 10;
// Row 1 
prefixGroup.add("statictext", undefined, "Prefix for layer names:");
var prefixInput = prefixGroup.add("edittext", undefined, "TOS_");
prefixInput.characters = 20; // Adjust the number of characters as needed

prefixGroup.add("statictext", undefined, "EP Name:");
var PropNameInput = prefixGroup.add("edittext", undefined, "Text Input");
prefixInput.characters = 20; // Adjust the number of characters as needed



var edittext1 = dialog.add('edittext {properties: {name: "edittext1", multiline: true, scrollable: true}}');
edittext1.text = "Line 1\nLine 2\nLine 3\nLine 4\nLine 5";
edittext1.preferredSize.width = 800;
edittext1.preferredSize.height = 400;
edittext1.alignment = ["center", "top"];

var group1 = dialog.add("group", undefined, {name: "group1"});
group1.orientation = "row";
group1.alignChildren = ["left", "center"];
group1.spacing = 10;
group1.margins = 0;

var button0 = group1.add("button", undefined, undefined, {name: "button0"});
button0.text = "Create text layers";
button0.alignment = ["left", "top"];
button0.onClick = readwrite;

var button1 = group1.add("button", undefined, undefined, {name: "button1"});
button1.text = "Create Compositions";
button1.alignment = ["left", "top"];
button1.onClick = readwriteComps;

dialog.show();

// Function to create text layers
function readwrite() {
    app.beginUndoGroup("TextLayerGenerator");

    var textContent = edittext1.text;
    var values = textContent.split(/\n/);
    var layer = app.project.activeItem.selectedLayers[0];
    var prefix = prefixInput.text;

    if (layer instanceof TextLayer) {
        for (var i = 0; i < values.length; i++) {
            var value = values[i];
            var duplicatedLayer = layer.duplicate();
            duplicatedLayer.name = prefix + (i + 1);

            // Change Source Text
            var textProp = duplicatedLayer.property("Source Text");
            var textDocument = textProp.value;
            textDocument.text = value;
            textProp.setValue(textDocument);
        }
    } else {
        for (var i = 0; i < values.length; i++) {
            var value = values[i];
            var duplicatedLayer = layer.duplicate();
            duplicatedLayer.name = prefix + (i + 1);

            // Change Essential Property - Text Input
            var textInputProperty = duplicatedLayer.property("Essential Properties").property("Text Input");
            textInputProperty.setValue(value);
        }
    }

    app.endUndoGroup();
    dialog.close();
}
// Function to create precomp
function readwriteComps() {
    app.beginUndoGroup("TextLayerGenerator");

    var textContent = edittext1.text;
    var values = textContent.split(/\n/);
    var layer = app.project.activeItem.selectedLayers[0];
    var prefix = prefixInput.text;
    var PropName = PropNameInput.text;

    // Create new folder
    var myFolder = app.project.rootFolder.items.addFolder('_Versioning');

    if (layer instanceof TextLayer) {
        for (var i = 0; i < values.length; i++) {
            var value = values[i];
            layer.name = "Text"
            // Duplicate comp
            var activeComp = app.project.activeItem;
            var duplicatedComp = activeComp.duplicate();
            duplicatedComp.name = prefix + (i + 1);
            duplicatedComp.comment = value;

            // Change Source Text of the layer in duplicated
            var textLayer = duplicatedComp.layer("Text"); 
            var textProp = textLayer.property("Source Text");
            var textDocument = textProp.value;
            textDocument.text = value;
            textProp.setValue(textDocument);
            
            // Move Item into Folder
            duplicatedComp.parentFolder = myFolder;
        }
    } else {
        for (var i = 0; i < values.length; i++) {
            // split text into multiple lines
            var value = values[i];
            var delimiter = "&&&"
            var lines = value.split(delimiter);

            layer.name = "Text"

            // Duplicate comp
            var activeComp = app.project.activeItem;
            var duplicatedComp = activeComp.duplicate();
            duplicatedComp.name = prefix + (i + 1) + "_" + values[i];
            duplicatedComp.comment = value;

            // Change Source Text of the layer in duplicated
            var textLayer = duplicatedComp.layer("Text"); 
            var textProp = textLayer.property("Essential Properties").property(PropName);
            textProp.setValue(value);

            // Move Item into Folder
            duplicatedComp.parentFolder = myFolder;
        }
    }


    app.endUndoGroup();
    dialog.close();
}
