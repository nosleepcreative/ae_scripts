/*
Script Name: nsc_ArrangeRadial
Description: This script arranges selected layers in a circular pattern.

Author: Desmond Du
Website: duitbetter.com, https://github.com/nosleepcreative, https://www.youtube.com/@NoSleepCreative
Version: 1.0 
Date: September 15, 2023
Copyright(c) 2023 nosleepcreative (Desmond Du). All rights reserved

Notes:
- You can add any additional notes, acknowledgments, or credits here.
- Mention if there are known issues or limitations.
- Provide contact information for support or feedback.
*/
 
// Create an undo group
app.beginUndoGroup('Arrange Layers into Rings');

// Get the active composition
var comp = app.project.activeItem;

// Check if a composition is selected
if (comp !== null && comp instanceof CompItem) {
  // Get the selected layers
  var selectedLayers = comp.selectedLayers;
  var numLayers = selectedLayers.length;

  // Prompt the user to input the radius size
  var radius = prompt("Please input the radius size", 500);

  // Convert the input to a number (or use a default value if the input is invalid)
  radius = isNaN(parseFloat(radius)) ? 500 : parseFloat(radius);

  // Define the center point of the ring
  var centerX = comp.width / 2;
  var centerY = comp.height / 2;

  // Loop through each selected layer
  for (var i = 0; i < numLayers; i++) {
    var layer = selectedLayers[i];
    var parentLayer = layer.parent;

    // Calculate the angle for the current layer
    var angle = (i / numLayers) * 2 * Math.PI;

    // Calculate the new position for the current layer
    var x = centerX + radius * Math.cos(angle);
    var y = centerY + radius * Math.sin(angle);

    // Set the position of the current layer
    layer.position.setValue([x, y]);
  }
}

// Close the undo group
app.endUndoGroup();
