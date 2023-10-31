/*
Script Name: Your Script Name
Description: 
- Briefly describe the primary function or purpose of your script.
- Mention any key features or tasks it performs.
- Provide context for its use and benefits.

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

// basic setup
var myComp = app.project.activeItem;

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
myNull.name = "NULL_" + mySelection.name;
myNull.label = 9;
myNull.position.setValue(myPosition);
myNull.threeDLayer = mySelection.threeDLayer;

// Make the selected layer a child of the null
mySelection.parent = myNull;

// Add FFX from local directory
var ffxFile = new File("C:/Users/Desmond/Documents/Adobe/After Effects 2023/User Presets/Behaviors/nsc_NullRig_v0.9.ffx");
if (ffxFile.exists) {
    mySelection.applyPreset(ffxFile);
} else {
    alert("Preset file not found!");
}

// If the shift key is held when the script is launched
if (ScriptUI.environment.keyboardState.shiftKey) {
    // Your desired action here (e.g., alert("Shift key was pressed!"))
    alert("Shift key was pressed!");
}

app.endUndoGroup();


