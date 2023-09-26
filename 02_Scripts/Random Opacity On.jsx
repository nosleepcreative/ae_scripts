app.beginUndoGroup("Undo")
var comp = app.project.activeItem;

// Create a null layer called "Controls" and add a Slider Control effect
var controlsNull = app.project.activeItem.layers.addNull();
controlsNull.name = "Controls";

var sliderEffect = controlsNull.Effects.addProperty("ADBE Slider Control");
sliderEffect.name = "Threshold";
// Add keyframes to animate the "Threshold" slider 
sliderEffect.property("Slider").setValueAtTime(0, 100);
sliderEffect.property("Slider").setValueAtTime(3, 0);

var sliderEffect2 = controlsNull.Effects.addProperty("ADBE Slider Control");
sliderEffect2.name = "Seed";


// Add the opacity expression to all layers except the Controls null layer
var activeComp = app.project.activeItem;
for (var i = 1; i <= activeComp.numLayers; i++) {
    var layer = activeComp.layer(i);
    if (layer !== controlsNull) {
        layer.opacity.expression =
            'seed = thisComp.layer("Controls").effect("Seed")("Slider");\n' +
            'threshold = thisComp.layer("Controls").effect("Threshold")("Slider");\n' +
            'seedRandom(seed, true);\n' +
            'randValue = random(0, 90);\n' +
            'if (randValue < threshold) {\n' +
            '    100;\n' +
            '} else {\n' +
            '    0;\n' +
            '}';
    }
}
