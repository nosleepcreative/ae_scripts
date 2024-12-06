/*
Script Name: Create Drop Shadow Shape
Description: 
- Quickly create a drop shadow for increasing readability of text on-screen using a masked shape layer

Author: Desmond Du
Website: duitbetter.com, https://github.com/nosleepcreative, https://www.youtube.com/@NoSleepCreative
Version: 1.0 
Date: [DATE], 2024
Copyright(c) 2024 nosleepcreative (Desmond Du). All rights reserved

Use Case:

Also see:

Change Log:

Future improvements:

*/

function createShapeWithPreset(path) {
    var comp = app.project.activeItem;
    if (!(comp instanceof CompItem)) return alert("Select a valid composition.");

    app.beginUndoGroup("Create Guide Layer");
    var layer = comp.layers.addShape();
    layer.name = "Shadow";
    layer.label = 15;

    var ffx = new File(path);
    if (!ffx.exists) return alert("Preset not found at: " + path);

    var originalTime = comp.time;
    comp.time = 0;
    layer.applyPreset(ffx);
    comp.time = originalTime;

    app.endUndoGroup();
}

// Run the function with the preset file path
var filePath1 = "C:/Users/Desmond/Documents/Adobe/After Effects 2024/User Presets/02.01 Generators/Drop Shadow Shape.ffx";
createShapeWithPreset(filePath1);
