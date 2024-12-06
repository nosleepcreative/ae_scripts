{
    function duplicateAndDistributeSpherical() {
        // Check if a comp is open
        var comp = app.project.activeItem;
        if (!(comp instanceof CompItem)) {
            alert("Please select a composition.");
            return;
        }

        // Check if a layer is selected
        var selectedLayer = comp.selectedLayers[0];
        if (!selectedLayer) {
            alert("Please select a layer.");
            return;
        }

        // Prompt user for the number of vertices
        var numVertices = parseInt(prompt("Enter the number of layers to distribute on the sphere:", "20"), 10);
        if (isNaN(numVertices) || numVertices <= 0) {
            alert("Please enter a valid number greater than zero.");
            return;
        }

        // Begin undo group
        app.beginUndoGroup("Duplicate and Arrange in Sphere");

        // Sphere arrangement calculations
        var phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians
        var radius = 500; // Adjust sphere radius

        // Get composition center
        var compCenterX = comp.width / 2;
        var compCenterY = comp.height / 2;

        for (var i = 0; i < numVertices; i++) {
            var theta = phi * i; // Angle around the Z-axis
            var y = 1 - (i / (numVertices - 1)) * 2; // Map i to [-1, 1] for sphere
            var radiusXZ = Math.sqrt(1 - y * y); // Calculate XZ radius for given Y

            var x = Math.cos(theta) * radiusXZ;
            var z = Math.sin(theta) * radiusXZ;

            // Duplicate layer and set position
            var newLayer = selectedLayer.duplicate();
            newLayer.threeDLayer = true;
            newLayer.position.setValue([
                compCenterX + x * radius, // Center X
                compCenterY + y * radius, // Center Y
                z * radius // Depth
            ]);
        }

        // End undo group
        app.endUndoGroup();
    }

    duplicateAndDistributeSpherical();
}
//https://docs.mamoworld.com/iexpressions/layer-placement/distribute-3d-sphere-evenly/