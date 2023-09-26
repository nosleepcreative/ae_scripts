myComp = app.project.activeItem;
app.beginUndoGroup("Add Gradient Ramp")
mySolid = myComp.layers.addSolid([0,.8,.4], "BG", myComp.width, myComp.height,1);
mySolid.startTime = 0
// mySolid.property("Effects").addProperty("Fractal Noise");
addFx(mySolid,"Fractal Noise",'')
mySlider = addFx(mySolid,"Slider Control",'vel')

x =  mySolid.effect("Fractal Noise")("ADBE Fractal Noise-0023");
x.expressionEnabled = 'true';
x.expression = 'time*effect("' + mySlider.name + '")("Slider")'

app.endUndoGroup();
// alert(mySolid.effect("Fractal Noise")("ADBE Fractal Noise-0023").name);

////////////////////////////////////////////////////////////////////
function addFx(layer, fxName, yourFxName) {
    efx = layer.property("Effects").addProperty(fxName);
    if (yourFxName != '') {
        efx.name = yourFxName.toString()
    }
    return efx;
}
