/*
Script Name: OCD Labeling
Description: 
- Set all color labels of all layers to be none
- Make Null layers Green Label
- Make Text Layers Cyan Label
- Make any precomp with Essential Properties Fuschia


Author: Desmond Du
Website: duitbetter.com, https://github.com/nosleepcreative, https://www.youtube.com/@NoSleepCreative
Version: 1.0 
Date: 10 October 2023
Copyright(c) 2024 nosleepcreative (Desmond Du). All rights reserved

Use Case:

Also see:

Change Log:

Future improvements:

*/
var comp = app.project.activeItem;


if (comp && comp instanceof CompItem) {
    app.beginUndoGroup("Set Layer Labels");
    for (var i = 1; i <= comp.numLayers; i++) {
        var layer = comp.layer(i);
        layer.label = 0; // Default: None

        var layerName = layer.name.toLowerCase();

        if (layerName.includes("void")) {
            layer.label = 9; // Green
        } else if (layerName.includes("logo")) {
            layer.label = 10; // Fuchsia
        } else if (layer.nullLayer) {
            layer.label = 9; // Green for Null layers
        } else if (layer instanceof TextLayer) {
            layer.label = 14; // Cyan for Text layers
        }
    }
    app.endUndoGroup();
}
