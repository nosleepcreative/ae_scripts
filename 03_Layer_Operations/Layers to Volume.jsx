// After Effects Script: Arrange Layers in 3D Volume, Centered to Comp, with Random Offset
(function arrangeLayersInVolume() {
    app.beginUndoGroup("Arrange Layers in 3D Volume");

    // Get the active composition
    var comp = app.project.activeItem;
    if (!(comp && comp instanceof CompItem)) {
        alert("Please select a composition first.");
        return;
    }

    // Get selected layers
    var layers = comp.selectedLayers;
    if (layers.length === 0) {
        alert("Please select at least one layer.");
        return;
    }

    // Get user inputs for dimensions and offset
    var userInput = prompt(
        "Enter Width, Height, Depth, and Random Offset (e.g., 3840,3840,3840,150):",
        "1920,1920,3840,150"
    );
    if (!userInput) {
        alert("Operation cancelled.");
        return;
    }

    // Parse inputs
    var inputs = userInput.split(",");
    if (inputs.length !== 4) {
        alert("Please enter exactly four values: Width, Height, Depth, Offset.");
        return;
    }

    var width = parseFloat(inputs[0]);
    var height = parseFloat(inputs[1]);
    var depth = parseFloat(inputs[2]);
    var offset = parseFloat(inputs[3]);

    if (isNaN(width) || isNaN(height) || isNaN(depth) || isNaN(offset)) {
        alert("All values must be valid numbers.");
        return;
    }

    // Get the center of the comp
    var compCenterX = comp.width / 2;
    var compCenterY = comp.height / 2;
    var compCenterZ = 0; // Assume Z center is 0 for now

    // Calculate grid dimensions manually
    var totalLayers = layers.length;
    var gridSize = Math.ceil(Math.pow(totalLayers, 1 / 3)); // Approximate cube root
    var xStep = width / (gridSize - 1);
    var yStep = height / (gridSize - 1);
    var zStep = depth / (gridSize - 1);

    // Arrange layers in 3D volume, centered to comp
    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        var xIndex = i % gridSize;
        var yIndex = Math.floor(i / gridSize) % gridSize;
        var zIndex = Math.floor(i / (gridSize * gridSize));

        var x = xIndex * xStep - width / 2 + compCenterX;
        var y = yIndex * yStep - height / 2 + compCenterY;
        var z = zIndex * zStep - depth / 2 + compCenterZ;

        // Add random offset
        x += (Math.random() - 0.5) * offset;
        y += (Math.random() - 0.5) * offset;
        z += (Math.random() - 0.5) * offset;

        // Set layer position
        layer.threeDLayer = true; // Ensure the layer is 3D
        layer.position.setValue([x, y, z]);
    }

    app.endUndoGroup();
})();
