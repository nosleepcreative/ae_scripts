// Prompt the user for a marker comment
var markerComment = prompt("Enter the marker comment:", "CHANGE TEXT HERE");

// Get the selected layers
var selectedLayers = app.project.activeItem.selectedLayers;

// Loop through each selected layer and add a marker with the entered comment
for (var i = 0; i < selectedLayers.length; i++) {
    var currentLayer = selectedLayers[i];
    currentLayer.property("Marker").setValueAtTime(currentLayer.time, new MarkerValue(markerComment));
}


