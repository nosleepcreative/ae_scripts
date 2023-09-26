// randomTransformControls
var myComp = app.project.activeItem;
var myLayers = myComp.selectedLayers;
////////////////////////////////////////////////////////////////////

app.beginUndoGroup('randomTransformControls')
// create controls & sliders
var ctrl = addNull("controls");
var seed = addFx(ctrl, "Slider Control", "seed")
var pos = addFx(ctrl, "3D Point Control", "positionRange")
var scale = addFx(ctrl, "Point Control", "scaleRange")
var rot = addFx(ctrl, "Point Control", "rotation_Range")

// create expressions
var exp1 = 'var controls = thisComp.layer("controls");\nvar randProp = controls.effect("positionRange")("3D Point");\nlet seed = controls.effect("seed")("Slider");\nvar bool = randProp.active;\nvar t = thisComp.layer("controls").transform.position;\nseedRandom(seed,true);\nrand = random(-randProp,randProp);\nif(bool==true) t+rand;\n else value;'
var exp2 = 'var controls = thisComp.layer("controls");\nvar randProp = controls.effect("scaleRange")("Point");\nlet seed = controls.effect("seed")("Slider");\nvar bool = randProp.active;\nseedRandom(seed,true);\nrand = random(randProp[0],randProp[1]);\nif(bool==true) [rand,rand];\n else value;'
var exp3 = 'var controls = thisComp.layer("controls");\nvar randProp = controls.effect("rotation_Range")("Point");\nlet seed = controls.effect("seed")("Slider");\nvar bool = randProp.active;\nseedRandom(seed,true);\nrand = random(randProp[0],randProp[1]);\nif(bool==true) rand;\n else value;'


//main: connect expressions
for (i = 0; i < myComp.selectedLayers.length; i++) {
    connectprop(myLayers[i], "Position", exp1)
    connectprop(myLayers[i], "Scale", exp2)
    connectprop(myLayers[i], "Rotate Z", exp3)
}
app.endUndoGroup();
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

function addFx(layer, fxName, yourFxName) {
    // eg. addFx(ctrl, "Slider Control", '')
    efx = layer.property("Effects").addProperty(fxName);
    if (yourFxName != '') {
        efx.name = yourFxName.toString()
    }
    return efx
}


// function concatExp(prop) {
//     line = []
//     line[0] = "var ctrl = thisComp.layer('" + ctrl.name + "')"
//     line[1] = "var myRange = index - ctrl.index;"
//     line[2] = "var offset = ctrl.effect('delay')('Slider')*myIndex;"
//     line[3] = "ctrl.transform.position+[0,0,offset]"
//     myExp = ""
//
//     for (i = 0; i <= line.length; i++) {
//         myExp += line[i] + "\n"
//     }
//     return myExp
// }

function connectprop(layer, prop, exp) {
    s = "ADBE " + prop;
    myProp = layer.property("ADBE Transform Group").property(s);
    myProp.expressionEnabled = true;
    myProp.expression = exp;
}
