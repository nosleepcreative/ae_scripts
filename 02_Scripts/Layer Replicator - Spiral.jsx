/*
Script Name: Layer Replicator - Spiral
Description: 
-
Author: Your Name
Website: duitbetter.com, https://github.com/nosleepcreative, https://www.youtube.com/@NoSleepCreative
Version: 1.0
Date: September 15, 2023
Copyright(c) 2023 nosleepcreative (Desmond Du). All rights reserved

ALso see:
https://madebyloop.co.uk/after-effects-scripts/spoke-radial-layer-repeater-after-effects/
*/


// basic setup
var comp = app.project.activeItem;
var mySelection = comp.selectedLayers[0];
var compWidth = comp.width;
var compHeight = comp.height;
var centerX = compWidth/2;
var centerY = compHeight/2;


// Loop to create linear
function duplicateAndSpiral(layer, copies, radius, depth, rotateLayer) {
    // Loop through the number of copies
    for (var i = 0; i < copies; i++) {
        // Calculate angle for the current text layer
        var angle = (i / copies) * 2 * Math.PI;
        var rotationAngle = rotateLayer ? (i / copies) * 360 : 0;
        
        // Calculate position based on the angle and radius
        var x = centerX + radius * Math.cos(angle);
        var y = centerY + radius * Math.sin(angle);
        var z = depth * (i / copies)

        // Duplicate the layer
        var duplicateLayer = layer.duplicate();
        
        // Set the duplicated layer's position
        duplicateLayer.position.setValue([x, y, z]);
        
        // Set the duplicated layer's rotation
        duplicateLayer.rotation.setValue(rotationAngle);
    }
}


// Prompt the user for the diameter and number of rows
var copiesInput = prompt("Enter the number of copies", "15");
var radiusInput = prompt("Enter the Radius", "1000");
var depthInput = prompt("Enter the depth", "1000");



duplicateAndSpiral(mySelection,copiesInput,radiusInput,depthInput,1);