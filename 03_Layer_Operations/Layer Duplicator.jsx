/*
Script Name: Layer Duplicator
Description: 
- This script prompts the user for a number and duplicates the selected layer in Adobe After Effects the specified number of times.
- Key features include validating user input to ensure it's a number and preventing execution if no layer is selected or if the input is invalid.
- Designed for motion designers and creative technologists to streamline the process of creating multiple duplicates of a layer, saving time and reducing manual repetition.
- Benefits include increased efficiency in workflow and the ability to rapidly prototype variations within compositions.

Author: Desmond Du
Website: duitbetter.com, https://github.com/nosleepcreative, https://www.youtube.com/@NoSleepCreative
Version: 1.0 
Date: February 19, 2024
Copyright(c) 2024 nosleepcreative (Desmond Du). All rights reserved

Use Case:
- Ideal for motion graphics projects where repetitive duplication of layers for effects, backgrounds, or animations is needed. Simplifies the process, allowing for more focus on creativity and design.

Also see:
- For more scripts and tools designed to enhance motion graphics workflows, visit https://github.com/nosleepcreative.

Change Log:
- 1.0 (February 19, 2024): Initial release.

Future improvements:
- Add support for duplicating multiple selected layers simultaneously.
- Implement a GUI for more complex configurations, such as specifying different duplication intervals or adding random transformations to each duplicate.
- Integrate with other scripts and plugins for a more seamless workflow in After Effects.
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