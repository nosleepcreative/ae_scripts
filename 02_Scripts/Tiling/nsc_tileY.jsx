var myComp = app.project.activeItem;
var myLayers = myComp.selectedLayers;
var ctrl = myComp.selectedLayers[0];
// var myY = ctrl.("ADBE Transform Group").property("ADBE Position_0");
var myPos = ctrl.property("Position").value

// function addSlider(layer, fxName) {
//     if (layer.property("Effects")("Slider Control")) {}
//     efx = layer.property("Effects").addProperty("Slider Control");
//     efx.name = fxName.toString();
// }
app.beginUndoGroup("addCtrls");

for (i = 1; i < myLayers.length; i++) {
    var thisLayer = myLayers[i];
    var previousLayer = myLayers[i - 1];
    // var preX = previousLayer.("ADBE Transform Group").("ADBE Position X");
    // var preWidth = previousLayer.sourceRect().width / 2;
    thisLayer.transform.position.setValue([myPos[0]+150,myPos[1]])
    // thisLayer.transform.position.setValue([previousLayer.property("Position x") + preWidth, previousLayer.property("Position Y")])

}
