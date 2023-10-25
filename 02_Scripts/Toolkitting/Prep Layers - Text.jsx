// Renames layer
// Add market with comments
// Change label colors

app.beginUndoGroup("Undo")

var markerComment = "CHANGE TEXT HERE";
var labelColor = 14; // CYAN
myName = "Text";

// Get the selected layers
var selectedLayers = app.project.activeItem.selectedLayers;

// Loop through each selected layer and add a marker with the entered comment
for (var i = 0; i < selectedLayers.length; i++) {
    var currentLayer = selectedLayers[i];

    // Change the name of the layer to "Text"
    currentLayer.name = myName;

    // Check if the current layer is a text layer
    if (currentLayer instanceof TextLayer) {
        // Change the label color to cyan
        currentLayer.label = labelColor ; 

        // Add a marker with the entered comment
        currentLayer.property("Marker").setValueAtTime(0, new MarkerValue(markerComment));
    }
}