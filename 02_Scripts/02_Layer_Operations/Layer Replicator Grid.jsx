/*
Script Name: Layer Replicator - Grid
Version: 1.0
Date: September 20, 2023

Description: 
This script allows the user to  duplicate a layer in a grid-like pattern.
Change Log
v 1.1.0 Center to composition
-
Author: Desmond Du
Website: https://duitbetter.com, https://github.com/nosleepcreative, https://www.youtube.com/@NoSleepCreative
Copyright(c) 2023 nosleepcreative (Desmond Du). All rights reserved
*/
// Basic setup
var comp = app.project.activeItem;
var mySelection = comp.selectedLayers[0];
var compWidth = comp.width;
var compHeight = comp.height;
var centerX = compWidth / 2;
var centerY = compHeight / 2;

app.beginUndoGroup("Undo Center Everything");

function duplicateTransform(layer, rows, columns, spacing) {
    var totalWidth = spacing * (columns - 1);
    var totalHeight = spacing * (rows - 1);
    
    // Calculate the starting position to center the grid
    var startX = centerX - (totalWidth / 2);
    var startY = centerY - (totalHeight / 2);

    // Loop through the number of rows
    for (var i = 0; i < rows; i++) {
        var y = startY + spacing * i;

        // Loop through the number of columns
        for (var j = 0; j < columns; j++) {
            var x = startX + spacing * j;
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
var rowInput = parseInt(prompt("Enter the number of rows", "10"), 10);
var colInput = parseInt(prompt("Enter the number of columns", "10"), 10);
var spacingInput = parseInt(prompt("Enter the spacing between rows/columns", "100"), 10);

duplicateTransform(mySelection, rowInput, colInput, spacingInput);

app.endUndoGroup();
