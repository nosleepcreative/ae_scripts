function scaleLogosWithAspectControl() {
    if (!app.project) return alert("Please open a project.");
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) return alert("Please select a composition.");
    if (comp.selectedLayers.length === 0) return alert("Please select at least one layer.");

    var baseWidth = getBaseWidth();
    if (baseWidth === null) return; // Exit if input is invalid or canceled

    app.beginUndoGroup("Advanced Aspect Ratio Scaling");

    for (var i = 0; i < comp.selectedLayers.length; i++) {
        var layer = comp.selectedLayers[i];
        var aspect = getAspectRatio(layer);

        // Calculate scale based on refined aspect ratio thresholds
        var scaleFactor = calculateAdvancedScaleFactor(aspect, baseWidth, layer.source.height);

        // Apply the uniform scale to both X and Y
        layer.property("Scale").setValue([scaleFactor, scaleFactor, 100]);
    }

    app.endUndoGroup();
}

function calculateAdvancedScaleFactor(aspect, baseWidth, height) {
    var scaleFactor;

    // Adjust scaling with finer control for aspect ratio ranges
    if (aspect <= 0.5) scaleFactor = (baseWidth * 1.3 / height) * 100; // Very tall
    else if (aspect <= 0.75) scaleFactor = (baseWidth * 1.3 / height) * 100; // Tall
    else if (aspect <= 1.0) scaleFactor = (baseWidth * 1.5 / height) * 100; // Near-square
    else if (aspect <= 1.5) scaleFactor = (baseWidth * 1.35 / height) * 100; // Square or slightly wide
    else if (aspect <= 2.0) scaleFactor = (baseWidth * 1.4 / height) * 100; // Wide
    else if (aspect <= 2.25) scaleFactor = (baseWidth * 1.2 / height) * 100; 

    else if (aspect <= 3.0) scaleFactor = (baseWidth * 1.1 / height) * 100; // Very wide
    else if (aspect <= 3.5) scaleFactor = (baseWidth * 0.85 / height) * 100; 
    else if (aspect <= 4.0) scaleFactor = (baseWidth * 0.75 / height) * 100; // Ultra wide
    else if (aspect <= 5.0) scaleFactor = (baseWidth * 0.6 / height) * 100; // Ultra wide
    else if (aspect <= 7.0) scaleFactor = (baseWidth * 0.5 / height) * 100; // Super wide
    else if (aspect <= 10.0) scaleFactor = (baseWidth * 0.4 / height) * 100; // Extremely wide
    else scaleFactor = (baseWidth * 2.0 / height) * 100; // Beyond ultra-wide

    return scaleFactor;
}

function getBaseWidth() {
    var input = prompt("Enter the base width in pixels:", "50");
    var width = parseInt(input, 10);
    if (isNaN(width) || width <= 0) {
        alert("Invalid input. Please enter a positive number.");
        return null;
    }
    return width;
}

function getAspectRatio(layer) {
    var source = layer.source;
    return source && source.width && source.height
        ? source.width / source.height
        : 1; // Default to 1:1 if dimensions are invalid
}

// Run the script
scaleLogosWithAspectControl();
