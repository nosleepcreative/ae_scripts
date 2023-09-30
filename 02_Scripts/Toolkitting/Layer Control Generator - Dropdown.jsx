// Generates a control layer and dropdown menu for managing layer visibility.

// Begin an undo group
app.beginUndoGroup("Modify Dropdown Control");

try {
    // Get the active composition
    var comp = app.project.activeItem;

    // Check if a composition is selected
    if (comp && comp instanceof CompItem) {
        // Get all layers in the composition
        var allLayers = comp.layers;

        // Add each layer's name to the dropdown items array
        var dropdownItems = [];
        for (var i = 1; i <= allLayers.length; i++) {
            var currentLayer = allLayers[i];
            dropdownItems.push(currentLayer.name);
        }

        // Create a null called "Controls"
        var controlsNull = comp.layers.addNull();
        controlsNull.name = "Controls";
        controlsNull.guideLayer = true;
        controlsNull.label = 14;
        controlsNull.moveToEnd();

        // Add a Dropdown Control effect
        var dropdownEffect = controlsNull.Effects.addProperty("ADBE Dropdown Control");
        // Set the dropdown items based on layer names 
        dropdownEffect.property(1).setPropertyParameters(dropdownItems);

        // Add the opacity expression to all layers
        for (var j = 1; j <= allLayers.length; j++) {
            var currentLayer = allLayers[j];
            // Set the expression to the opacity property for each layer
            currentLayer.property("Opacity").expression = 'thisComp.layer("Controls").effect("Dropdown Menu Control")("Menu") == ' + j + ' ? 100 : 0;';
        }
    } else {
        alert("Please select a composition.");
    }
} catch (error) {
    alert("An error occurred: " + error.toString());
} finally {
    app.endUndoGroup();
}


