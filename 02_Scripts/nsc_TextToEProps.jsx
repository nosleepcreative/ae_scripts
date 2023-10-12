/*
Script Name: nsc_TextToEProps
Description: 
This script duplicates a selected text layer and updates the source text of the Essential Property "Text Input" based on user-provided text.

Author: Desmond Du
Website: duitbetter.com, https://github.com/nosleepcreative, https://www.youtube.com/@NoSleepCreative
Version: 1.0
Date: October 11, 2023
Copyright (c) 2023 nosleepcreative (Desmond Du). All rights reserved
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

var edittext1 = dialog.add('edittext {properties: {name: "edittext1", multiline: true, scrollable: true}}');
edittext1.text = "Line 1\nLine 2\nLine 3\nLine 4\nLine 5";
edittext1.preferredSize.width = 200;
edittext1.preferredSize.height = 200;
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

dialog.show();

// Function to create text layers
function readwrite() {
    app.beginUndoGroup("TextLayerGenerator");

    var textContent = edittext1.text;
    var values = textContent.split(/(\n|\r)/);
    var layer = app.project.activeItem.selectedLayers[0];

    for (var i = 0; i < values.length; i++) {
        var value = values[i];
        var duplicatedLayer = layer.duplicate();
        duplicatedLayer.name = "SUPER_" + (i + 1);
        var textInputProperty = duplicatedLayer.property("Essential Properties").property("Text Input");
        textInputProperty.setValue(value);
      }


    app.endUndoGroup();
    dialog.close();
}
