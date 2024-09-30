/*
Script Name: nsc_AddNullRig
Description: 
1. Create a Null Parent for selected layer
2. Add Null Rig ffx from local directory

Author: Desmond Du
Website: duitbetter.com, https://github.com/nosleepcreative, https://www.youtube.com/@NoSleepCreative
Version: 1.01 
Date: [DATE], 2023
Copyright(c) 2023 nosleepcreative (Desmond Du). All rights reserved

Use Case:

Also see:

Change Log:
v1.0.1 - 2024-02-14: Change name of Control Null to "NR-Controls-LayerName"

Future improvements:
- Change name to "NR-Controls-(001)"

*/

// basic setup
var myComp = app.project.activeItem;
var basePath = "C:/Users/Desmond/Documents/Adobe/After Effects 2024/User Presets/00.01 Toolbox/"
var ffxName = "nsc_NullRig.ffx"
var ffxPath = basePath+ ffxName

// Ensure a composition is active
if (!(myComp instanceof CompItem)) {
    alert("Please select a composition first.");
}

var selectedLayers = myComp.selectedLayers;
var compWidth = myComp.width;
var compHeight = myComp.height;
var centerX = compWidth / 2;
var centerY = compHeight / 2;

app.beginUndoGroup("Undo Group");

// If no layer is selected, create a Null named "Controls"
if (selectedLayers.length == 0) {
    var controlNull = myComp.layers.addNull();
    controlNull.name = "Controls";
}

// Get current position of the first selected layer
var mySelection = selectedLayers[0];
var myPosition = mySelection.transform.position.value;

// If multiple layers are selected, calculate the middle position of the layers
if (selectedLayers.length > 1) {
    var totalX = 0;
    var totalY = 0;
    
    for (var i = 0; i < selectedLayers.length; i++) {
        totalX += selectedLayers[i].transform.position.value[0];
        totalY += selectedLayers[i].transform.position.value[1];
    }
    
    myPosition = [totalX / selectedLayers.length, totalY / selectedLayers.length];
}

// Create null
var myNull = myComp.layers.addNull();
myNull.name = "NR-Controls-" + mySelection.name;
myNull.label = 9;
myNull.guideLayer = !myNull.guideLayer;
myNull.position.setValue(myPosition);
myNull.threeDLayer = mySelection.threeDLayer;

// Make the selected layer a child of the null
mySelection.parent = myNull;

// Add FFX from local directory
var ffxFile = new File(ffxPath);
if (ffxFile.exists) {
    mySelection.applyPreset(ffxFile);
} else {
    alert("Preset file not found!");
}

// Trim to in and out
myNull.inPoint = mySelection.inPoint;
myNull.outPoint = mySelection.outPoint;

// If the shift key is held when the script is launched
if (ScriptUI.environment.keyboardState.shiftKey) {
    // Your desired action here (e.g., alert("Shift key was pressed!"))
    alert("Shift key was pressed!");
}

app.endUndoGroup();


