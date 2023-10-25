{
    app.beginUndoGroup("Create XZ Carousel");

    var comp = app.project.activeItem;
    if (comp !== null && (comp instanceof CompItem)) {
        var selectedLayers = comp.selectedLayers;
        var numLayers = selectedLayers.length;

        if (numLayers > 0) {
            // Create a null object to control the carousel
            var controlNull = comp.layers.addNull();
            controlNull.name = "Carousel Control";
            controlNull.property("Position").setValue([comp.width / 2, comp.height / 2, 0]);

            // Add slider controls to the null for rotation and radius
            var controlEffect = controlNull.Effects.addProperty("Slider Control");
            controlEffect.name = "Rotation";
            var radiusEffect = controlNull.Effects.addProperty("Slider Control");
            radiusEffect.name = "Radius";
            radiusEffect.property("Slider").setValue(comp.width / 4); // Default radius

            for (var i = 0; i < numLayers; i++) {
                var layer = selectedLayers[i];
                var angle = (i / numLayers) * 2 * Math.PI; // Calculate angle for each layer

                // Set position expression to place layers in a carousel
                var positionExpression = 'var controlLayer = thisComp.layer(\"Carousel Control\");\
                var rotation = controlLayer.effect("Rotation")("Slider");\
                var radius = controlLayer.effect("Radius")("Slider");\
                var angle = (" + angle + " + rotation) % (2 * Math.PI);\
                var x = controlLayer.position[0] + Math.cos(angle) * radius;\
                var z = controlLayer.position[2] + Math.sin(angle) * radius;\
                [x, position[1], z];'
            
                layer.transform.position.expression = positionExpression;
            }
        } else {
            alert("Please select some layers first.");
        }
    } else {
        alert("Please select a composition.");
    }

    app.endUndoGroup();
}
