/*
Script Name: nsc_MarkersToLayers
Description: 
- Duplicates the current layer
- Freeze frame at marker

Author: Desmond Du
Website: duitbetter.com, https://github.com/nosleepcreative, https://www.youtube.com/@NoSleepCreative
Version: 1.0 
Date: [DATE], 2023
Copyright(c) 2023 nosleepcreative (Desmond Du). All rights reserved

Use Case:

Also see:

Change Log:

Future improvements:
make original not visible and label cyan
Index the markers
rename the layer to marker index

*/

// Check if a composition is active and a layer is selected
var comp = app.project.activeItem;
if (!comp || !(comp instanceof CompItem) || comp.selectedLayers.length === 0) {
    alert("Please select a composition and at least one layer.");
} else {
    // Begin undo group
    app.beginUndoGroup("Duplicate and Freeze Frame");

    // Get the first selected layer
    var selectedLayer = comp.selectedLayers[0];
    var markers = selectedLayer.property("Marker");
    if (markers.numKeys > 0) {
      
        for (var j = 1; j <= markers.numKeys; j++) {
            // Duplicate the selected layer
            var dupLayer = selectedLayer.duplicate();
            dupLayer.name = "Frame_"+j
            // Get marker time
            dupLayer.timeRemapEnabled = true;
            var markerTime = markers.keyTime(j);
            var freezeFrameTime = markerTime - dupLayer.inPoint;
            var timeRemap = dupLayer.property("ADBE Time Remapping");
            // Replace inpoint key with marker time
            timeRemap.setValueAtTime(0, freezeFrameTime);
            // Apply freeze frame at each marker time
            timeRemap.setInterpolationTypeAtKey(1,KeyframeInterpolationType.HOLD)
            // Remove last keyframe


            
        }
    }
    selectedLayer.label = 14;
    // End undo group
    app.endUndoGroup();
}
