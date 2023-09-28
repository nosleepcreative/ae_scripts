//  fitToHeight scriplet
var myComp = app.project.activeItem;
var myLayers = myComp.selectedLayers;
var myHeight = prompt("What is the layer height (px)?", 100);

function getSrcSize(layer) {
    var currentTime = app.project.activeItem.time;
    var layerScale = layer.transform.scale.value;
    var layerSrc = layer.sourceRectAtTime(currentTime, false)
    var layerSizeX = layerScale[0] / 100 * layerSrc.width;
    var layerSizeY = layerScale[1] / 100 * layerSrc.height;
    var layerSize = [layerSizeX, layerSizeY];
    return layerSize;
}

function fitToHeight(layer, heightValue) {
    var layerHeight = getSrcSize(layer)[1];
    var layerScale = layer.transform.scale.value;

    // debug if scale 0
    if (layerScale[0] == 0) {
        layerScale = [100, 100]
    }
    var sizeRatio = heightValue / layerHeight;
    var newSize = [layerScale[0] * sizeRatio, layerScale[1] * sizeRatio];

    layer.transform.scale.setValue(newSize);
}

//scriplet usage
app.beginUndoGroup("fitToHeight");

for (i = 0; i < myLayers.length; i++) {
    myTile = myLayers[i];
    fitToHeight(myTile, myHeight)
}