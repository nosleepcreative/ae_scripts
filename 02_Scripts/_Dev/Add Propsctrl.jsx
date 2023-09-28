/* nsc_addProps_Ctrl.jsx
Copyright(c) 2021 nosleepcreative (Desmond Du). All rights reserved
Website: duitbetter.com
Youtbe: NoSleepCreative

Name: nsc_addProps_Ctrl.jsx
Version.1.0

Description:
// XXX:
Instructions:
--
*/

var myComp = app.project.activeItem;
var myLayers = myComp.selectedLayers;
var eleNum = 0;

// Find "controls" null, create one if none
try {

} catch (e) {
    myNull = comp.layers.addNull();
    myNull.name = "colors";
    myNull.label = 9;
}



for (i = 1; i <= 10; i++) {
    addSlider(i);
}

function addSlider(fxName) {
    efx = myNull.property("Effects").addProperty("Color Control");
    efx.name = fxName.toString(); // numbered
}

function createSliders(props) {
    eleNum = props.length;
    switch (c) {
        case 1:

    }
}
