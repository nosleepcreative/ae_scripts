// Get the active composition
var comp = app.project.activeItem;

if (comp && comp instanceof CompItem) {
    // Get the selected layer
    var selectedLayer = comp.selectedLayers[0];

    if (selectedLayer) {
        // Calculate the number of circles and their spacing
        var numCircles = 10; // Adjust as needed
        var circleSpacing = 500; // Adjust as needed

        for (var i = 1; i <= numCircles; i++) {
            var radius = i * circleSpacing;
            var duplicateLayer = selectedLayer.duplicate();
            duplicateLayer.position.setValue([comp.width / 2, comp.height / 2]);
            duplicateLayer.scale.setValue([radius / (selectedLayer.width / 2), radius / (selectedLayer.height / 2)]*100);
        }
    } else {
        alert("Please select a layer to duplicate.");
    }
} else {
    alert("Please open or create a composition.");
}
