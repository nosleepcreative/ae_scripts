/*
Script Name:Set Reference Edit

Description: 
Quickly transforming the selected layer into a reference element, improving visibility and organization.

Tasks Summary
1. Converts the selected layer into a guide layer, making it non-renderable.
2. Labels the selected layer with a cyan color for easy identification.
3. Renames the selected layer to "REFERENCE EDIT."
4. Sets the position of the selected layer to the top left corner of the composition.
5. Adds a FFX (Effect Preset) to the selected layer, providing an array of additional controls and effects customization.

Author: Desmond Du
Website: duitbetter.com, https://github.com/nosleepcreative, https://www.youtube.com/@NoSleepCreative
Version: 1.01 
Date: December 26, 2023
Copyright(c) 2023 nosleepcreative (Desmond Du). All rights reserved

Use Case:
1. Great for working with reference edits or animatic then you need to have tuck in a corner

Also see:

Change Log:
v 1.01 Duplcate 


Future improvements:
*/


app.beginUndoGroup("Reference Edit");

var ffxPath = "C:/Users/Desmond/Documents/Adobe/After Effects 2024/User Presets/01.01 Utility/Set Reference Position.ffx";
var ffxFile = new File(ffxPath);

var comp = app.project.activeItem;
if (!(comp instanceof CompItem)) alert("Please open a composition.");

// Check if Shift key is pressed
if (ScriptUI.environment.keyboardState.shiftKey) {
    // Search for a layer named "REFERENCE EDIT"
    var refLayer = comp.layer("REFERENCE EDIT");
    if (refLayer) {
        refLayer.guideLayer = !refLayer.guideLayer;
        refLayer.enabled = !refLayer.enabled;
    } else {
        alert('"REFERENCE EDIT" layer not found.');
    }
} else {
   
    // Normal behavior: Toggle guide layer and duplicate if audio is enabled
    var layers = comp.selectedLayers;
    if (layers.length !== 1) alert("Please select one layer.");

    var layer = layers[0];
    layer.guideLayer = !layer.guideLayer;
    layer.name = "REFERENCE EDIT";
    layer.label = 14;

    /*
    if (layer.hasAudio) {
        layer.audioEnabled = false;
        var dup = layer.duplicate();
        dup.enabled = false;
        dup.name = "REFERENCE EDIT - AUDIO ONLY";
        dup.label = 14;
        if (ffxFile.exists) dup.applyPreset(ffxFile);
    }
    */

    if (ffxFile.exists) layer.applyPreset(ffxFile);
    else alert("Preset file not found!");
}

app.endUndoGroup();
