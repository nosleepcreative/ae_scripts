/* nsc_TileGrid.jsx
Copyright(c) 2023 NoSleepCreative (Desmond Du). All rights reserved.
Website: duitbetter.com

Name: nsc_TileGrid (no controls)
Version.1.0

Description:
This script tiles selected layers in a composition into a grid based on specified number of columns, and center it in the compositions

Use Case:

Change Log:
v.1.0. Rename script to nsc_TileGrid

Future improvements:
1. sourceRectAtTime;
2. normalize size if layers are different size and scale
3. Fit to comp with padding
4. Specify rows options

2024.06.17, Joe:  Auto size the assets to evenly fill up the screen. 
Ultimately I want to use video, but have to be able to adjust the position in each clip on each slide as well, because like you saw, the person sometimes gets cropped weirdly. 
I'm using create mattes in Flex so going to see the easiest way to reposition them as they slide around.

*/


var myComp = app.project.activeItem;3
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