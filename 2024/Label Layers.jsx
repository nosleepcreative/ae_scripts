{
    var comp = app.project.activeItem;

    if (comp && comp instanceof CompItem && comp.selectedLayers.length > 0) {
        app.beginUndoGroup("Label Layers with Text");

        var selectedLayers = comp.selectedLayers;

        for (var i = 0; i < selectedLayers.length; i++) {
            var layer = selectedLayers[i];

            // Function to calculate the final scale by considering the hierarchy of parented layers
            function getFinalScale(layer) {
                var scale = layer.scale.value;

                while (layer.parent !== null) {
                    var parentScale = layer.parent.scale.value;
                    scale[0] *= parentScale[0] / 100;
                    scale[1] *= parentScale[1] / 100;
                    layer = layer.parent;
                }

                return scale;
            }

            // Function to calculate the final position by considering the hierarchy of parented layers
            function getFinalPosition(layer) {
                var position = layer.position.value;

                while (layer.parent !== null) {
                    var parentPosition = layer.parent.position.value;
                    position[0] += parentPosition[0];
                    position[1] += parentPosition[1];
                    layer = layer.parent;
                }

                return position;
            }

            // Get the final scale and position by taking parent layers into account
            var finalScale = getFinalScale(layer);
            var finalPosition = getFinalPosition(layer);

            // Get the layer's height using its bounds at the current time
            var layerBounds = layer.sourceRectAtTime(layer.time, false);
            var layerHeight = layerBounds.height;

            // Apply the final Y-scale to the height
            var scaledHeight = layerHeight * (finalScale[1] / 100);

            // Create a text layer with the name of the selected layer
            var textLayer = comp.layers.addText(layer.name);
            textLayer.name = "Label:" + layer.name;

            // Set the position of the text layer 30px underneath the bottom of the scaled and parented layer
            var layerBottomY = finalPosition[1] + (scaledHeight / 2); // Calculate the bottom edge Y position
            var textPosition = [finalPosition[0], layerBottomY + 30]; // Position text 30px below the layer
            textLayer.position.setValue(textPosition);

            // Make sure the text layer is placed directly under the original layer
            textLayer.moveBefore(layer);

            // Match the start time and duration of the new text layer to the original layer
            textLayer.inPoint = layer.inPoint;
            textLayer.outPoint = layer.outPoint;

            // Modify the text properties (font size, color, and font family)
            var textProp = textLayer.property("Source Text");
            var textDocument = textProp.value;

            textDocument.fontSize = 25;         // Set font size to 25px
            textDocument.fillColor = [0, 0, 0]; // Set font color to black (RGB: 0, 0, 0)
            textDocument.font = "ArialMT";        // Set font to Arial

            textProp.setValue(textDocument); // Apply the changes to the text layer
        }

        app.endUndoGroup();
    } else {
        alert("Please select one or more layers in an active composition.");
    }
}
