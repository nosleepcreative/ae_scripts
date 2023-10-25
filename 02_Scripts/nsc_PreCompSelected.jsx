/*
Script Name: nsc_PrecompSelected
Description: This script precompose selected layers to their layer durations
Author: Desmond Du
Website: duitbetter.com, https://github.com/nosleepcreative, https://www.youtube.com/@NoSleepCreative
Version: 1.1
Date: October 2023
Copyright (c) 2023 nosleepcreative (Desmond Du). All rights reserved
*/


// Reference links:
// Script:  https://www.chriszwar.com/?p=243
// Algorithm: https://creativecow.net/forums/thread/extendscript-to-pre-compose-selected-layers-moving/

app.beginUndoGroup("PrecompLayers");

var thisComp = app.project.activeItem;
var selLayers = thisComp.selectedLayers;

// Find the minimum inPoint and maximum outPoint of selected layers using map()
var min_inPoint = Math.min.apply(0, selLayers.map(function (l) { return l.inPoint; }));
var max_outPoint = Math.max.apply(0, selLayers.map(function (l) { return l.outPoint; }));
var layers_duration = max_outPoint - min_inPoint;

// Create a new precomposition
var newComp = thisComp.layers.precompose(selLayers.map(function (l) { return l.index; }), "precomp", true);

// Adjust the start time of each layer within the precomposition
for (var l = 1; l <= newComp.numLayers; l++) {
    newComp.layer(l).startTime -= min_inPoint;
}

// Set the duration of the precomposition to match the selected layers
newComp.duration = layers_duration;

// Set the startTime of the first selected layer to the minimum inPoint
thisComp.selectedLayers[0].startTime = min_inPoint; 

app.endUndoGroup();
