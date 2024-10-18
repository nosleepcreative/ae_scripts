// Generates a control layer and slider control for managing layer visibility.
// Also, make the slider control into Essential Properties

app.beginUndoGroup("Create Controls and Opacity Expression");

function addToMotionGraphicsTemplate(comp, property) {
    if (property.propertyGroup(1).name === "Effects") {
        var fx = property.property(1);
        fx.addToMotionGraphicsTemplateAs(comp, property.name);
    } else {
        property.addToMotionGraphicsTemplateAs(comp, property.name);
    }
}

try {
    // Step 1: Create a null called "Controls"
    var controlsNull = app.project.activeItem.layers.addNull();
    controlsNull.name = "Controls";
    controlsNull.guideLayer = true;
    controlsNull.label = 9;
    controlsNull.moveToEnd();

    markerComment = "SELECT BACKGROUND HERE";
    
    // Step 2: Create a slider control called "Selection"
    var sliderEffect = controlsNull.Effects.addProperty("ADBE Slider Control");
    sliderEffect.name = "Selection";
    sliderEffect("Slider").setValue(1);

    // Step 3: Add the slider control as an Essential Property
    addToMotionGraphicsTemplate(app.project.activeItem,sliderEffect)

    // Step 4: Add the opacity expression to all layers
    var activeComp = app.project.activeItem;
    for (var i = 1; i <= activeComp.numLayers; i++) {
        var layer = activeComp.layer(i);
        if (layer != controlsNull) {
            layer.opacity.expression = 'thisComp.layer("Controls").effect("Selection")("Slider")==index ? 100 : 0;';
        }
    }
} catch (error) {
    alert("An error occurred: " + error.toString());
} finally {
    app.endUndoGroup();
}



