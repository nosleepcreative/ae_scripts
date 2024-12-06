{
    // Define parameters for ring spacing
    var RING_DISTANCE = 200; // Distance between rings
    var START_RADIUS = 0; // Initial radius for the first ring
    var CENTER_X = 1920; // Center X position (default 1920x1080 comp)
    var CENTER_Y = 1920; // Center Y position (default 1920x1080 comp)

    function arrangeLayersInRings() {
        var comp = app.project.activeItem;

        if (!(comp && comp instanceof CompItem)) {
            alert("Please select a composition.");
            return;
        }

        var selectedLayers = comp.selectedLayers;
        if (selectedLayers.length === 0) {
            alert("Please select some layers to arrange.");
            return;
        }

        app.beginUndoGroup("Arrange Layers in Rings");

        var ringIndex = 0; // Tracks which ring we are placing layers in
        var layersInCurrentRing = 0; // Tracks how many layers are in the current ring
        var maxLayersInRing = 1; // Maximum layers in the current ring
        var angleStep; // Angle between each layer in the ring
        var currentRadius = START_RADIUS; // Radius of the current ring

        for (var i = 0; i < selectedLayers.length; i++) {
            if (layersInCurrentRing >= maxLayersInRing) {
                // Move to the next ring
                ringIndex++;
                layersInCurrentRing = 0;
                maxLayersInRing = Math.ceil(2 * Math.PI * ringIndex); // Increase max layers as rings grow
                currentRadius = START_RADIUS + ringIndex * RING_DISTANCE; // Update radius for the new ring
            }

            angleStep = (2 * Math.PI) / maxLayersInRing; // Angle step for the current ring
            var angle = angleStep * layersInCurrentRing; // Angle for the current layer

            var xPos = CENTER_X + currentRadius * Math.cos(angle); // Calculate X position
            var yPos = CENTER_Y + currentRadius * Math.sin(angle); // Calculate Y position

            selectedLayers[i].property("Position").setValue([xPos, yPos]); // Set the layer's position
            layersInCurrentRing++;
        }

        app.endUndoGroup();
    }

    // Run the script
    arrangeLayersInRings();
}
