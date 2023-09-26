// addControlSlidersPrompt.jsx

var myComp = app.project.activeItem;
var myLayer = myComp.selectedLayers[0];
app.beginUndoGroup("main");
if (myLayer == null) {
    var myNull = myComp.layers.addNull();
    myNull.name = 'controls';
    myNull.label = 9; // green

    str = prompt("List all Slider Control names", "seed,vel,x,y");
    str = str.split(",");
    for (i = 0; i < str.length; i++) {
        addSlider(myNull, trim(str[i]));
    }
} else {
    str = prompt("List all Slider Control names", "seed,vel,x,y");
    str = str.split(",");
    for (i = 0; i < str.length; i++) {
        addSlider(myNull, trim(str[i]));
    }
}

function addSlider(layer, fxName) {
    efx = layer.property("Effects").addProperty("Slider Control");
    efx.name = fxName.toString()
}

function trim(str) {
    return str.replace(/^\s+/, '').replace(/\s+$/, '');
}

// old control creator
// var comp = app.project.activeItem;
// var myNull = comp.layers.addNull();
// myNull.name = "controls";
// myNull.label =9;
// addSlider("seed");
// addSlider("x");
// addSlider("y");
//
//
// function addSlider(fxname){
// efx = myNull.property("Effects").addProperty("Slider Control");
// efx.name = fxname;
// }
//