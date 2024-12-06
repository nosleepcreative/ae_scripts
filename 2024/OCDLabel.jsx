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

Green: Main controls/key layer: "Control, rig,""
Cyan: Text/Text Precomps: copy, legal, text
Purple: EGFX
Pink: Comps that used EGFX
Fuschia: Media to be replaced or swapped

*/
var comp = app.project.activeItem;


if (comp && comp instanceof CompItem) {
    app.beginUndoGroup("Set Layer Labels");
    for (var i = 1; i <= comp.numLayers; i++) {
        var layer = comp.layer(i);
        layer.label = 0; // Default: None

        var layerName = layer.name.toLowerCase();

        if (layerName.includes("void") || layerName.includes("control") || layerName.includes("rig")) {
            layer.label = 9; // Green for "void", "control", and "rig"
        } else if (layerName.includes("logo")||layerName.includes("lockup")||layerName.includes("slab")) {
            layer.label = 13; // Fuchsia for "logo"
        } else if (layer.nullLayer) {
            layer.label = 9; // Green for Null layers
        } else if (layer instanceof TextLayer || layerName.includes("copy") || layerName.includes("legal") || layerName.includes("text") || layerName.includes("tagline")) {
            layer.label = 14; // Cyan for Text layers, "copy", "legal", and "text"
        }
    }
    app.endUndoGroup();
}

// Variant Adjustment Layer rename; Vignette: Vig, Vibrance, Blur