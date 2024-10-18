// Renames layer
// Add market with comments
// Change label colors

app.beginUndoGroup("Undo")

var markerComment = "REPLACE LOGO HERE";
var labelColor = 13; 
myName = "LOGO";

// Get the selected layers
var selectedLayers = app.project.activeItem.selectedLayers;

// Loop through each selected layer and add a marker with the entered comment
for (var i = 0; i < selectedLayers.length; i++) {
    var currentLayer = selectedLayers[i];

    // Change the name of the layer to "Text"
    currentLayer.name = "Logo";
    // Change the label color to cyan
    currentLayer.label = labelColor; 

    // Add a marker with the entered comment
    currentLayer.property("Marker").setValueAtTime(currentLayer.inPoint, new MarkerValue(markerComment));

}
