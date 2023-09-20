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
// Loop to create linear
function duplicateTransform(layer, copies) {
    // Loop through the number of copies
    for (var i = 0; i < copies; i++) {
        // Calculate angle for the current text layer
        var rotationAngle = Math.random() * 360;

        // Duplicate the layer
        var duplicateLayer = layer.duplicate();
        
       // Transform the layer
        duplicateLayer.rotationX.setValue(rotationAngle);
        duplicateLayer.rotationY.setValue(rotationAngle);
        duplicateLayer.rotationZ.setValue(rotationAngle);

    }
}
// Prompt the user for the diameter and number of rows
var copiesInput = prompt("Enter the number of copies", "15");

duplicateTransform(mySelection,copiesInput);