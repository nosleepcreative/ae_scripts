/*
Script Name: nsc_SetReferenceEdit

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
Version: 1.0 
Date: December 26, 2023
Copyright(c) 2023 nosleepcreative (Desmond Du). All rights reserved

Use Case:
1. Great for working with reference edits or animatic then you need to have tuck in a corner

Also see:

Change Log:

Future improvements:
*/

app.beginUndoGroup("Undo")

// Check if a composition is active
if (app.project.activeItem instanceof CompItem) {
    var selectedLayers = app.project.activeItem.selectedLayers;
    
    if (selectedLayers.length === 1) {
        var selectedLayer = selectedLayers[0];
        selectedLayer.guideLayer = !selectedLayer.guideLayer;
        selectedLayer.name = "REFERENCE EDIT";
        selectedLayer.label = 14;
        // Add FFX from local directory
        var ffxFile = new File("C:/Users/Desmond/Documents/Adobe/After Effects 2024/User Presets/01.02 Utility - Guides/Set Reference Position.ffx");
        if (ffxFile.exists) {
            selectedLayer.applyPreset(ffxFile);
        } else {
            alert("Preset file not found!");
        }
      
    } else if (selectedLayers.length === 0) {
        alert("Please select a layer in the active composition.");
    } else {
        alert("Please select only one layer in the active composition.");
    }
} else {
    alert("Please open a composition to use this script.");
}
