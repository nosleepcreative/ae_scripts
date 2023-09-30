/*
Script Name: Color Control Link
Description: 
- Create a color

Instructions: 
- Include step-by-step instructions on how to use the script.
- Highlight any user inputs or settings that may be required.
- Mention any specific requirements or dependencies.

Author: Your Name
Website: duitbetter.com, https://github.com/nosleepcreative, https://www.youtube.com/@NoSleepCreative
Version: 1.0 (or specify the current version)
Date: September 15, 2023 (or the date of the latest update)
Copyright(c) 2023 nosleepcreative (Desmond Du). All rights reserved

Notes:
- You can add any additional notes, acknowledgments, or credits here.
- Mention if there are known issues or limitations.
- Provide contact information for support or feedback.
*/

app.beginUndoGroup("Link Fill Effects");

var comp = app.project.activeItem;
var selectedLayers = comp.selectedLayers;
// Check if "Linked Colors" null layer exists, and create it if not

var linkedFillColorsNull = comp.layers.byName("Linked Colors");
if (!linkedFillColorsNull) {
    linkedFillColorsNull = comp.layers.addNull();
    linkedFillColorsNull.name = "Linked Colors";
    linkedFillColorsNull.guideLayer = true;
    linkedFillColorsNull.label = 9;
    markerComment = "CHANGE SCENE COLORS HERE";
    linkedFillColorsNull.property("Marker").setValueAtTime(currentLayer.time, new MarkerValue(markerComment))
}
// Iterate through selected layers
for (var i = 0; i < selectedLayers.length; i++) {
    var layer = selectedLayers[i];

    // Check if the layer has a Fill effect
    var fillEffect = null;
    var myColor = [0,0,0,0]
    for (var j = 1; j <= layer.Effects.numProperties; j++) {
        var effect = layer.Effects.property(j);
        if (effect.matchName === "ADBE Fill") {
            fillEffect = effect;
            myColor = fillEffect("Color").value

            break;
        }
    }

    if (fillEffect) {
        // Duplicate the Fill effect to the null layer
        var duplicatedEffect = linkedFillColorsNull.Effects.addProperty("ADBE Color Control");
        duplicatedEffect.name = layer.name + " Fill";
        duplicatedEffect("Color").setValue(myColor)

        // Link the Fill effect's color property to the duplicated effect
        var expressionString = 'thisComp.layer("Linked Colors").effect("'+layer.name+' Fill")("Color");';
        fillEffect.property("Color").expression = expressionString;
    }
}

app.endUndoGroup();
