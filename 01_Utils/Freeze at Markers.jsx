// After Effects Script to Duplicate Layer Based on Markers and Freeze Frame

function duplicateLayerAtMarkers() {
    var comp = app.project.activeItem;
    if (!(comp && comp instanceof CompItem)) {
        alert("Please select a composition.");
        return;
    }

    var selectedLayers = comp.selectedLayers;
    if (selectedLayers.length === 0) {
        alert("Please select a layer.");
        return;
    }

    var layer = selectedLayers[0];
    var markers = layer.property("ADBE Marker");
    var markerCount = markers.numKeys;

    if (markerCount === 0) {
        alert("The selected layer has no markers.");
        return;
    }

    app.beginUndoGroup("Duplicate Layer at Markers");

    for (var i = 1; i <= markerCount; i++) {
        var markerTime = markers.keyTime(i);
        
        // Duplicate the layer
        var duplicatedLayer = layer.duplicate();
        
        // Move the duplicated layer to the marker time
        duplicatedLayer.startTime = markerTime;
        
        // Apply time remapping and freeze frame
        duplicatedLayer.timeRemapEnabled = true;
        var timeRemap = duplicatedLayer.property("ADBE Time Remapping");
        
        // Add a keyframe at the marker time and remove the last keyframe
        timeRemap.setValueAtTime(markerTime, markerTime);
        timeRemap.removeKey(timeRemap.numKeys);
    }

    app.endUndoGroup();
}

duplicateLayerAtMarkers();
