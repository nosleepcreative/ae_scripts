/* Add Expressions to Selected Properties
- Check if selected properties can set expressions
- Create a Null control layer if none
- Create slider controls within control null based on selected properties names
- Add expressions to selected properties to link to slider controls


// also see:
- https://community.adobe.com/t5/after-effects-discussions/creating-a-script-to-add-control-sliders-based-on-selected-properties-but-get-rid-of-duplicants/td-p/10294647
- https://community.adobe.com/t5/after-effects-discussions/add-expression-on-selected-property-items/td-p/9855713

*/(function() {
    app.beginUndoGroup("Add Sliders for Array Properties and Link Expressions");

    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert("No comp selected");
        return;
    }

    var controlLayerName = "Control Layer";
    var controlLayer = null;

    // Search for an existing "Control Layer"
    for (var i = 1; i <= comp.numLayers; i++) {
        if (comp.layer(i).name === controlLayerName && comp.layer(i) instanceof AVLayer) {
            controlLayer = comp.layer(i);
            break;
        }
    }

    // If no "Control Layer" exists, create one
    if (!controlLayer) {
        controlLayer = comp.layers.addNull(comp.duration);
        controlLayer.name = controlLayerName;
    }

    var selectedProperties = comp.selectedProperties;
    selectedProperties.forEach(function(property) {
        if (property.canSetExpression) {
            if (property.value instanceof Array) {
                // Handle each element in the array (e.g., Scale X, Scale Y)
                for (var j = 0; j < property.value.length; j++) {
                    var dimensionName = ["X", "Y", "Z"][j] || j;
                    var sliderControl = controlLayer.Effects.addProperty("Slider Control");
                    sliderControl.name = property.name + " " + dimensionName;
                    var expression = 'thisComp.layer("' + controlLayer.name + '").effect("' + sliderControl.name + '")("Slider")';
                    property.expression = property.expression || "";
                    property.expression += "temp = " + property.expression + "; temp[" + j + "] = " + expression + "; temp;";
                }
            } else {
                // Handle single-value properties
                var sliderControl = controlLayer.property("Effects").addProperty("Slider Control");
                sliderControl.name = property.name + " Slider";
                var expression = 'thisComp.layer("' + controlLayer.name + '").effect("' + sliderControl.name + '")("Slider")';
                property.expression = expression;
            }
        }
    });

    app.endUndoGroup();
})();
