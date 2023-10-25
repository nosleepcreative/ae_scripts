/*
 nsc_normalizeLogos.jsx
 Copyright (c) 2020 NoSleepCreative (Desmond Du). All rights reserved.
 Website: duitbetter.com

 Name: nsc_normalizeLogos
 Version: 1.0

 Functionalities:
 - Applies a sample expression to the selected layers,
 - harvests the result,
 - and then removes the expression.

 How it works:
 - Select layers
 - A for-loop function finds the nominal scale factor (%)
 - Sets the scale to that norm
*/

app.beginUndoGroup("normalizeLogos");

// Shorthands
var proj = app.project;
var comp = proj.activeItem;
var selectedLayers = comp.selectedLayers;

// Variables
var nominalWidth1 = 960;
var nominalHeight1 = 875;
var nominalWidth2 = 1200;
var nominalHeight2 = 875;

var myLayer, myScale, myLayerWidth, myLayerHeight, nominalValue;

// Logic
function getNominalSize(width, height) {
    var ratio = width / height;
    var scaleFactor;
    if (ratio >= 0) scaleFactor = nominalHeight1 / height;
    if (ratio >= 0.8) scaleFactor = nominalWidth1 / width;
    if (ratio >= 1.0) scaleFactor = nominalHeight2 / height;
    if (ratio > 2.4) scaleFactor = nominalWidth2 / width;
    return scaleFactor/4;
}

// Execute
for (var i = 0; i < selectedLayers.length; i++) {
    myLayer = selectedLayers[i];
    myScale = myLayer.transform.scale;
    myLayerWidth = myLayer.width;
    myLayerHeight = myLayer.height;

    nominalValue = getNominalSize(myLayerWidth, myLayerHeight) * 100;
    myScale.setValue([nominalValue, nominalValue]);
}
 
app.endUndoGroup();  // Ending the undo group
