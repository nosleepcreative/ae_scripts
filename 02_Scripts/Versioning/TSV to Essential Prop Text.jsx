/*
Script Name: TSV to Essential Prop Text
Description: 
- This script reads data from a TSV (Tab-Separated Values) file to duplicate and modify Essential Properties of selected layer  within a composition in Adobe After Effects.
- Key features include the ability to skip rows with mismatched column counts, ensuring data integrity and selective processing of rows. It also automatically renames duplicated compositions based on data from the TSV file.
- This script is useful for motion designers and animators who need to create multiple versions of a composition with varying text or settings, streamlining what would otherwise be a manual and time-consuming task.

Author: Desmond Du
Website: duitbetter.com, https://github.com/nosleepcreative, https://www.youtube.com/@NoSleepCreative
Version: 1.0 
Date: May 22, 2023
Copyright(c) 2023 nosleepcreative (Desmond Du). All rights reserved

Use Case:
- Ideal for projects requiring rapid versioning of compositions, such as lower-thirds, where multiple variants of the same design/animation need to be generated with different text

Also see:
- N/A

Change Log:
- Initial release.

Future improvements:
- Status bar
- Implement error handling for unexpected data formats and improve user feedback.
- Add functionality to handle different types of layer properties beyond essential properties.
- Optimize UI for selecting files and setting options before processing begins.

*/

// Prompt user to select a TSV file
var file = File.openDialog("Select the TSV file", "*.tsv");

if (file != null) {
    if (file.open("r")) {
        var content = file.read();
        file.close();

        var lines = content.split("\n"); // split into rows
        var headers = lines[0].split("\t"); // split first row into columns for headers

        app.beginUndoGroup("TSV Text Replacer");

        var activeComp = app.project.activeItem;

        if (!(activeComp instanceof CompItem) || !activeComp.selectedLayers.length) {
            alert("Please select an active composition and a layer within it.");
        } else {
            var selectedLayer = activeComp.selectedLayers[0];
            for (var i = 1; i < lines.length; i++) {
                if (lines[i].trim() === "") continue; // Skip empty lines
                
                var values = lines[i].split("\t");
                if (values.length !== headers.length) continue; // Skip rows with mismatched column counts

                var comp = activeComp.duplicate();
                comp.name = activeComp.name + "_" + values[0];
                // comp.name = activeComp.name + "_" + i + "_" + values[0]; // index

                var selLayerIndex = selectedLayer.index
                var selectedLayer = comp.layer(selLayerIndex); // Assuming the layer to modify is the first layer

                for (var j = 0; j < headers.length; j++) {
                    var header = headers[j].trim();
                    var value = values[j].trim();

                    var ep = selectedLayer.property("Essential Properties").property(header);
                    if (ep) {
                        ep.setValue(value);
                    } else {
                        alert("Essential Property not found: " + header);
                    }
                }
            }
        }

        app.endUndoGroup();
    } else {
        alert("Failed to open file.");
    }
} else {
    alert("No file selected.");
}
