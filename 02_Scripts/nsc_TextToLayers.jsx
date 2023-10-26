/*
Script Name: nsc_TextToLayers
Description: 
THe script splits the provided text by line breaks into individual text layers.

Author: Desmond Du
Website: duitbetter.com, https://github.com/nosleepcreative, https://www.youtube.com/@NoSleepCreative
Version: 1.0
Date: October 25, 2023
Copyright (c) 2023 nosleepcreative (Desmond Du). All rights reserved
*/

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
edittext1.preferredSize.width = 800;
edittext1.preferredSize.height = 400;
edittext1.alignment = ["center", "top"];

var spacingGroup = dialog.add("group");
spacingGroup.alignChildren = ["left", "center"];
spacingGroup.spacing = 10;
spacingGroup.margins = 0;

spacingGroup.add("statictext", undefined, "Vertical Spacing:");
var spacingInput = spacingGroup.add("edittext", undefined, "75");
spacingInput.characters = 6;

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
button1.text = "?";
button1.onClick = help;

dialog.show();

// Function to create text layers
function readwrite() {
    app.beginUndoGroup("TextLayerGenerator");
    var comp = app.project.activeItem;
    if (comp instanceof CompItem) {
        var content = edittext1.text;
        var itemsArray = content.split(/\n|\r/);
        var yOffset = 100;
        var ySpacing = parseInt(spacingInput.text);

        for (var i = 0; i < itemsArray.length; i++) {
            if (itemsArray[i].trim() !== '') {
                var textLayer = comp.layers.addText(itemsArray[i]);
                textLayer.label = 14; // cyan
                textLayer.name = "Text_" + (i+1)
                textLayer.property("Position").setValue([comp.width / 2, yOffset]);
                yOffset += ySpacing;
            }
        }
    } else {
        alert("No active composition found.");
    }
    app.endUndoGroup();
    dialog.close();
}

// Function to show help information
function help() {
    alert("Created by Desmond Du\n11 Oct 2023\ndesmond@duitbetter.com");
}
