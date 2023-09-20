/*
Script Name: Layer Replicator - Grid
Version: 1.0
Date: September 20, 2023

Description: 
This script allows the user to  duplicate a layer in a grid-like pattern.

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

function duplicateTransform(layer, rows, columns, spacing) {
    // Loop through the number of rows
    for (var i = 0; i < rows; i++) {
        var y = layer.position.value[1] + spacing * i;

        // Loop through the number of columns
        for (var j = 0; j < columns; j++) {
            var x = layer.position.value[0] + spacing * j;
            var duplicateLayer = layer.duplicate();

            // Transformation
            duplicateLayer.position.setValue([x, y]);

            // Organization
            duplicateLayer.name = "Row " + i + " Col " + j;
            duplicateLayer.label = 7;
        }
    }
}

// Prompt the user for inputs
var rowInput = prompt("Enter the number of rows", "5");
var colInput = prompt("Enter the number of columns", "5");
var spacingInput = prompt("Enter the spacing between rows/columns", "100");

duplicateTransform(mySelection, rowInput, colInput, spacingInput);