// tileGrid.jsx (no controls)
/*
functionalities
1. tile selected layers into grid
3. Center grid to composition

to be added
1. sourceRectAtTime;
2. normalize size if layers are different size and scale
fit to comp with padding
specifc row and colums numbers
 */


var myComp = app.project.activeItem;
var myLayers = myComp.selectedLayers;
var myCompSize = [myComp.width, myComp.height];

function tileGrid(array, cols, colSpacing, rowSpacing) {
    app.beginUndoGroup("undo");

    // get base paremeters
    baseLayer = array[0]
    basePos = baseLayer.transform.position.value;

    // centerCoordinates
    numRows = Math.ceil(array.length / cols);
    centerRow = cols % 2 != 0 ? (Math.floor(cols / 2)) : (cols / 2) - .5;
    // centerCol = cols % 2 != 0 ?
    translateCenter = myCompSize / 2 - [centerRow * colSpacing, (numRows / 2 - .5) * rowSpacing]

    //loop through elements
    for (i = 0; i < array.length; i++) {
        myTile = array[i];
        myIndex = i + 1

        // get tile coordinates
        rowIndex = Math.ceil(myIndex / cols) - 1;
        colIndex = i % cols;
        myPos = [colIndex * colSpacing, rowIndex * rowSpacing] // + myCompSize / 2;
        myPos += translateCenter;

        // set the position
        myTile.transform.position.setValue(myPos);

    }

}

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



//usage
mySize = getSrcSize(myLayers[0]);
cols = parseInt(prompt("How many columns?", 10));
paddingX = parseInt(prompt("What is the X-padding (px)?", 50));
paddingY = parseInt(prompt("What is the Y-padding (px)?", 50));
tileGrid(myLayers, cols, mySize[0] + paddingX, mySize[1] + paddingY);