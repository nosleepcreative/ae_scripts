/*
Script Name: nsc_LayersToRing
Description: This script arranges selected layers in a circular pattern.

Author: Desmond Du
Website: duitbetter.com, https://github.com/nosleepcreative, https://www.youtube.com/@NoSleepCreative
Version: 1.0.1
Date: September 15, 2023
Copyright(c) 2023 nosleepcreative (Desmond Du). All rights reserved

Use Case:

Change Log:
v.1.0.0 Rename script to nsc_TileGrid
v.1.0.1 Rename script to nsc_LayersToRing, added height control to create oval shape

Future improvements:
Notes:
- You can add any additional notes, acknowledgments, or credits here.
- Mention if there are known issues or limitations.
- Provide contact information for support or feedback.
*/
 
// Create an undo group
app.beginUndoGroup('Arrange Layers into Oval Rings');

// Get the active composition
var comp = app.project.activeItem;

// Check if a composition is selected
if (comp !== null && comp instanceof CompItem) {
    // Get the selected layers
    var selectedLayers = comp.selectedLayers;
    var numLayers = selectedLayers.length;

    // Prompt the user to input the width and height of the oval
    var widthInput = prompt("Please input the width of the oval", 500);
    var heightInput = prompt("Please input the height of the oval", 500);

    // Convert the inputs to numbers (or use default values if the inputs are invalid)
    var width = isNaN(parseFloat(widthInput)) ? 800 : parseFloat(widthInput);
    var height = isNaN(parseFloat(heightInput)) ? 400 : parseFloat(heightInput);

    // Define the center point of the oval ring
    var centerX = comp.width / 2;
    var centerY = comp.height / 2;

    // Loop through each selected layer
    for (var i = 0; i < numLayers; i++) {
        var layer = selectedLayers[i];

        // Calculate the angle for the current layer
        var angle = (i / numLayers) * 2 * Math.PI;

        // Calculate the new position for the current layer with an oval shape
        var x = centerX + width * Math.cos(angle);
        var y = centerY + height * Math.sin(angle);

        // Set the position of the current layer
        layer.position.setValue([x, y]);
    }
}

// Close the undo group
app.endUndoGroup();
