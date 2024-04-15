// Get the selected layers
var selectedLayers = app.project.activeItem.selectedLayers;

// Loop through selected layers
for (var i = 0; i < selectedLayers.length; i++) {
    var layer = selectedLayers[i];
    var properties = layer.selectedProperties;

    // Loop through selected properties
    for (var j = 0; j < properties.length; j++) {
        var prop = properties[j];

        // Create slider control
        var sliderControl = layer.Effects.addProperty("ADBE Slider Control");
        sliderControl.name = prop.name + " Drift Speed";

        // Add expression to property
        var expression = "value + (time - inPoint) * thisComp.layer('" + layer.name + "').effect('" + sliderControl.name + "')('Slider');";
        prop.expression = expression;
    }
}


/*https://aenhancers.com/viewtopic.php?t=3218
https://aenhancers.com/viewtopic.php?t=2261 Add a Slider and an Expression to the selected Properties?

*/