/*
Script Name: nsc_AddMatte
Description: 
1. Adds a shape layer to the composition and sets it as a track matte for the selected layer.
2. Trims the duration of the shape layer to match the duration of the selected layer.
3. Optionally, adds a custom FFX (Effect Preset) to the selected layer to provide additional controls and effects customization.

Author: Desmond Du
Website: duitbetter.com, https://github.com/nosleepcreative, https://www.youtube.com/@NoSleepCreative
Version: 1.0 
Date: 26 December, 2023
Copyright(c) 2023 nosleepcreative (Desmond Du). All rights reserved

Use Case:

Also see:

Change Log:

Future improvements:

*/

// basic setup
var myComp = app.project.activeItem;
var mySelection = myComp.selectedLayers[0];
var compWidth = myComp.width;
var compHeight = myComp.height;
var centerX = compWidth/2;
var centerY = compHeight/2;

app.beginUndoGroup("Undo")


// Add shape layer
var shapeLayer = myComp.layers.addShape();

// formatting
shapeLayer.name = "MAT_" + mySelection.name;
shapeLayer.label = 12; // brown label

// Add shape properties
var rectGroup = shapeLayer.property("Contents").addProperty("ADBE Vector Group");
var rectPath = rectGroup.property("Contents").addProperty("ADBE Vector Shape - Rect");
rectPath.property("Size").setValue([myComp.width, myComp.height]);
var fill = rectGroup.property("Contents").addProperty("ADBE Vector Graphic - Fill");
fill.property("Color").setValue([1, 0, 0]);  
shapeLayer.moveBefore(mySelection);

// Trim to in and out
shapeLayer.inPoint = mySelection.inPoint;
shapeLayer.outPoint = mySelection.outPoint;

// Change the track matte of selected layer to the new BG shape
mySelection.setTrackMatte(shapeLayer, TrackMatteType.ALPHA);
shapeLayer.enabled=1;

