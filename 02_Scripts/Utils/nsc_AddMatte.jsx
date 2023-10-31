/*
Script Name: Your Script Name
Description: 
- Briefly describe the primary function or purpose of your script.
- Mention any key features or tasks it performs.
- Provide context for its use and benefits.

Author: Desmond Du
Website: duitbetter.com, https://github.com/nosleepcreative, https://www.youtube.com/@NoSleepCreative
Version: 1.0 
Date: [DATE], 2023
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


// Create a new BG shape
var shapeLayer = myComp.layers.addShape();
shapeLayer.name = "Matte";
shapeLayer.label = 12;

var rectGroup = shapeLayer.property("Contents").addProperty("ADBE Vector Group");
var rectPath = rectGroup.property("Contents").addProperty("ADBE Vector Shape - Rect");
rectPath.property("Size").setValue([myComp.width, myComp.height]);
var fill = rectGroup.property("Contents").addProperty("ADBE Vector Graphic - Fill");
fill.property("Color").setValue([1, 0, 0]);  
shapeLayer.moveBefore(mySelection);

// Change the track matte of selected layer to the new BG shape
mySelection.setTrackMatte(shapeLayer, TrackMatteType.ALPHA);
shapeLayer.enabled=1;
