// echo space
var myComp = app.project.activeItem;
var myLayers = myComp.selectedLayers;
var ctrl //= myComp.selectedLayers[0];

////////////////////////////////////////////////////////////////////



function addNull(myName) {

    try {
        var myNull = myComp.layer(myName)
        myNull.name = myName;

    } catch (e) {
        var myNull = myComp.layers.addNull();
        myNull.name = myName;
        myNull.label = 9; // green

    }
    ctrl = myNull;
    return myNull
}

function addSlider(layer, fxName) {
    try {
        layer.effect(fxName)("Slider")
    } catch (e) {
        efx = layer.property("Effects").addProperty("Slider Control");
        efx.name = fxName.toString()
    }
}

function concatExp(prop) {
    line = []
    line[0] = "var ctrl = thisComp.layer('" + ctrl.name + "')"
    line[1] = "var myIndex = index - ctrl.index;"
    line[2] = "var offset = ctrl.effect('delay')('Slider')*myIndex;"
    line[3] = "ctrl.transform.position+[0,0,offset]"
    myExp = ""

    for (i = 0; i <= line.length; i++) {
        myExp += line[i] + "\n"
    }
    return myExp
}

function connectprop(prop) {
    concatExp("transform." + prop.replace("Rotate Z", "rotation").toLowerCase())
    for (i = 1; i < myLayers.length; i++) {
        s = "ADBE " + prop;
        myLayers[i].property("ADBE Transform Group").property(s).expression = myExp;
    }
}
////////////////////////////////////////////////////////////////////

app.beginUndoGroup("addCtrls");
addSlider(addNull("controls"), "delay")
concatExp("Position")
connectprop("Position");
// connectprop("Rotate Z")
