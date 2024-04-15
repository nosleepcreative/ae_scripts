/*
Script Name: nsc_TextToComps
Description: 
THe script splits the provided text by line breaks and generates compositions with centered text layers, 
with each text layer drawn from an individual line of the provided text.

Author: Desmond Du
Website: duitbetter.com, https://github.com/nosleepcreative, https://www.youtube.com/@NoSleepCreative
Version: 1.0
Date: October 11, 2023
Copyright (c) 2023 nosleepcreative (Desmond Du). All rights reserved
*/


app.beginUndoGroup("Create Text Compositions");

// Basic setup
var comp = app.project.activeItem;
var mySelection = comp.selectedLayers[0];
var compWidth = comp.width;
var compHeight = comp.height;
var centerX = compWidth / 2;
var centerY = compHeight / 2;
var labelColor = 14; // CYAN
var markerComment = "CHANGE TEXT HERE";
var myName = "Copy";

// Create a dialog box for user input
var promptDialog = new Window("dialog", "Text Composition Generator");
promptDialog.orientation = "column";

// Composition size input
var sizeGroup = promptDialog.add("group");
sizeGroup.orientation = "row";
sizeGroup.add("statictext", undefined, "Composition Width:");
var widthInput = sizeGroup.add("edittext", undefined, "1920");
widthInput.characters = 6;
sizeGroup.add("statictext", undefined, "Height:");
var heightInput = sizeGroup.add("edittext", undefined, "1080");
heightInput.characters = 6;

// Text content input
promptDialog.add("statictext", undefined, "Text Content:");
var textInput = promptDialog.add('edittext {properties: {name: "edittext1", multiline: true, scrollable: true}}');
textInput.text = "Line 1\rLine 2\rLine 3\rLine 4\rLine 5";
textInput.preferredSize.width = 800;
textInput.preferredSize.height = 400;

// Composition prefix input
promptDialog.add("statictext", undefined, "Composition Prefix:");
var prefixInput = promptDialog.add("edittext", undefined, "TOS");
prefixInput.characters = 10;

// Button to execute
var createButton = promptDialog.add("button", undefined, "Create Compositions");
createButton.onClick = createCompositions;

promptDialog.show();

function createCompositions() {
    var compWidth = parseInt(widthInput.text);
    var compHeight = parseInt(heightInput.text);
    var textContent = textInput.text;
    var prefix = prefixInput.text;

    var textArray = textContent.split(/\r|\n/);

    for (var i = 0; i < textArray.length; i++) {
        var compositionName = prefix + "_" + (i + 1);
        var compositionComment = textArray[i];
        var newComp = app.project.items.addComp(compositionName, compWidth, compHeight, 1, textArray.length, 30);
        newComp.comment = compositionComment;

        var textLayer = newComp.layers.addText(textArray[i]);
        textLayer.name = myName;
        textLayer.label = labelColor;
        textLayer.property("Marker").setValueAtTime(0, new MarkerValue(markerComment));

        var textProp = textLayer.property("Source Text");
        textProp.setValue(textArray[i]);
        textLayer.position.setValue([newComp.width / 2, newComp.height / 2]);
    }

    // Close the dialog
    promptDialog.close();
}

app.endUndoGroup();
