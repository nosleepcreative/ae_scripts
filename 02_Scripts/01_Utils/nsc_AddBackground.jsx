/*
Script Name: nsc_AddBackground
Task summary
1. Create a shape layer with that is white, put to bottom

Author: Desmond Du
Website: duitbetter.com, https://github.com/nosleepcreative, https://www.youtube.com/@NoSleepCreative
Version: 1.0 
Date: [DATE], 2023
Copyright(c) 2023 nosleepcreative (Desmond Du). All rights reserved

Use Case:

Also see:

Change Log:

Future improvements:

*/
// Basic Setup
var myComp = app.project.activeItem;
var compWidth = myComp.width;
var compHeight = myComp.height;

// Calculate the center coordinates of the composition
var centerX = compWidth / 2;
var centerY = compHeight / 2;

// Begin an undo group for better organization
app.beginUndoGroup("Create Shape Layer");

// Define the base name for the shape layer
var baseName = "BG";
var uniqueName = baseName;

// Function to find a unique name
function findUniqueName(baseName) {
    var num = 1;
    while (myComp.layer(uniqueName) !== null) {
        num++;
        uniqueName = baseName + "-" +  num;
    }
    return uniqueName;
}

// Find a unique name for the shape layer
uniqueName = findUniqueName(baseName);

// Add the shape layer with the unique name
var shapeLayer = myComp.layers.addShape();
shapeLayer.name = uniqueName;

shapeLayer.moveToEnd();

// Add FFX from local directory
var ffxFile = new File("C:/Users/Desmond/Documents/Adobe/After Effects 2024/User Presets/02.02 Backgrounds/BG - Base Rig.ffx");
if (ffxFile.exists) {
    shapeLayer.applyPreset(ffxFile);
} else {
    alert("Preset file not found!");
       }
// End the undo group
app.endUndoGroup();
