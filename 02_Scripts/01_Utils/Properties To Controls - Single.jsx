/* Add Expressions to Selected Properties (Single value properties only)
- Check if selected properties can set expressions
- Create a Null control layer if none
- Create slider controls within control null based on selected properties names
- Add expressions to selected properties to link to slider controls

//future improvements
- Copy keyframes and delete old keyframes - hold shift, detect
- array to point, 3d control, control, checkbox
- Props to 2 sliders: Amount & Normalize Control (%) eg. Scale, Magnification, Size 


// also see:
- https://community.adobe.com/t5/after-effects-discussions/creating-a-script-to-add-control-sliders-based-on-selected-properties-but-get-rid-of-duplicants/td-p/10294647
- https://community.adobe.com/t5/after-effects-discussions/add-expression-on-selected-property-items/td-p/9855713

*/
(function() {
    app.beginUndoGroup("Add Sliders and Link Expressions");

    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert("No comp selected");
        return;
    }

    var selectedProperties = comp.selectedProperties;

    var controlLayerName = "PROPERTY CONTTROLS";
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


    selectedProperties.forEach(function(property) {
        if (property.canSetExpression) {
            var sliderControl = controlLayer.property("Effects").addProperty("Slider Control");
            sliderControl.name = property.name + " Slider";
            var expression = 'thisComp.layer("' + controlLayer.name + '").effect("' + sliderControl.name + '")("Slider")';
            property.expression = expression;
        }
    });

    app.endUndoGroup();
})();


