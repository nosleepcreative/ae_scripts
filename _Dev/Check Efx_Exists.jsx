var myComp = app.project.activeItem;
var myLayers = myComp.selectedLayers;
var ctrl = myComp.selectedLayers[0];

if(!ctrl.effect("delay")) {
    alert("exist")

} else alert("nope")

function fxExists(fxName, layer){

}
