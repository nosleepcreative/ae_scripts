/*
Script Name: nsc_NormalizeSize
Description: Resize selected layers to a user-specified height
Use Cases: 
- To resize multiple logo/media assets of different source width, height, or scale value to a fixed height

Author: Desmond Du
Website: duitbetter.com, https://github.com/nosleepcreative, https://www.youtube.com/@NoSleepCreative
Version: 1.0 
Date: October 24, 2023 
Copyright(c) 2023 nosleepcreative (Desmond Du). All rights reserved
*/


var myComp = app.project.activeItem;
var myLayers = myComp.selectedLayers;

var fitOption;

if (confirm("Fit by: Height? If not, click 'Cancel' for Width.")) {
    fitOption = "height";
    targetSize = prompt("What is the target height (px)?", 100);
} else {
    fitOption = "width";
    targetSize = prompt("What is the target width (px)?", 100);
}
var targetSize;

function getSourceSize(layer) {
    var currentTime = myComp.time;
    var layerScale = layer.transform.scale.value;
    var layerSrc = layer.sourceRectAtTime(currentTime, false);
    var layerWidth = layerScale[0] / 100 * layerSrc.width;
    var layerHeight = layerScale[1] / 100 * layerSrc.height;
    return [layerWidth, layerHeight];
}

function fitToSize(layer, targetValue, option) {
    var currentSize = getSourceSize(layer);
    var layerScale = layer.transform.scale.value;

    // Handle cases where scale is 0
    if (layerScale[0] === 0 || layerScale[1] === 0) {
        layerScale = [100, 100];
    }

    var scaleFactor;
    if (option.toLowerCase() === "height") {
        scaleFactor = targetValue / currentSize[1];
    } else {
        scaleFactor = targetValue / currentSize[0];
    }

    var newScale = [layerScale[0] * scaleFactor, layerScale[1] * scaleFactor];
    layer.transform.scale.setValue(newScale);
}

// Execute the script
app.beginUndoGroup("Fit to Size");
myLayers.forEach(function(layer) {
    fitToSize(layer, targetSize, fitOption);
});
app.endUndoGroup();
