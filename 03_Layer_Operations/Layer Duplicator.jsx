/*
Script Name: Layer Duplicator
Description: 
- This script prompts the user for a number and duplicates the selected layer in Adobe After Effects the specified number of times.

Author: Desmond Du
Website: duitbetter.com, https://github.com/nosleepcreative, https://www.youtube.com/@NoSleepCreative
Version: 1.0 
Date: February 19, 2024
Copyright(c) 2024 nosleepcreative (Desmond Du). All rights reserved

Use Case:
- Ideal for motion graphics projects where repetitive duplication of layers for effects, backgrounds, or animations is needed.

Change Log:
- 1.0 (February 19, 2024): Initial release.
*/

app.beginUndoGroup("Duplicate Selected Layers");
var comp = app.project.activeItem;
if (comp) {
    var numCopies = prompt("How many copies?", 5);
    if (numCopies) {
        for (var i = 0; i < comp.selectedLayers.length; i++) {
            for (var j = 1; j <= numCopies; j++) {

                L = comp.selectedLayers[i].duplicate();
                L.label = 3;
            }
        }
    }
}
app.endUndoGroup;