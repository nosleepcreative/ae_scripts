/*
Script Name: Layer Replicator - Random Rotation
Version: 1.0
Date: September 16, 2023

Description: 
This script duplicates a selected layer based on user input and randomly rotates them.

-
Author: Desmond Du
Website: https://duitbetter.com, https://github.com/nosleepcreative, https://www.youtube.com/@NoSleepCreative
Copyright(c) 2023 nosleepcreative (Desmond Du). All rights reserved
*/

// basic setup
var comp = app.project.activeItem;
var mySelection = comp.selectedLayers[0];
var compWidth = comp.width;
var compHeight = comp.height;
var centerX = compWidth/2;
var centerY = compHeight/2;

app.beginUndoGroup("Undo")

function duplicateTransform(layer,rowHeightSelection, copies, spacing) {
    // Loop through the number of copies
    for (var i = 0; i < copies; i++) {
        var duplicateLayer = layer.duplicate();

        //Tranformation
        var x = layer.position.value[0];
        var y = layer.position.value[1];
        var offset = spacing * i;
        rowHeightSelectionInput==0? x+=offset:y+=offset;
        duplicateLayer.position.setValue([x,y]);

        //Organization
        duplicateLayer.name = "Duplicate " + (i+1);
        duplicateLayer.label = 7;
        
    }
}

// Prompt the user for inputs
var rowHeightSelectionInput = confirm("Repeat row? Else columns")
var copiesInput = prompt("Enter the number of rows/columns", "15");
var spacingInput = prompt("Enter the spacing between rows/columns", "30");

duplicateTransform(mySelection,rowHeightSelectionInput,copiesInput, spacingInput);