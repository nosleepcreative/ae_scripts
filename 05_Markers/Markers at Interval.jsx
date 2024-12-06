{
    // Open a prompt to ask user for interval type (Frames or Seconds)
    var userChoice = prompt("Enter 'frames' or 'seconds' to set interval type for markers:", "frames");

    // Check if the user cancelled or entered an invalid choice
    if (userChoice === null || (userChoice !== 'frames' && userChoice !== 'seconds')) {
        alert("Invalid input. Please enter 'frames' or 'seconds'.");
    } else {
        // Ask user to input the interval value
        var interval = parseFloat(prompt("Enter the interval value (positive number):", "10"));

        if (isNaN(interval) || interval <= 0) {
            alert("Invalid interval value. Please enter a positive number.");
        } else {
            // Get the active composition
            var comp = app.project.activeItem;

            if (comp && comp instanceof CompItem) {
                var selectedLayers = comp.selectedLayers; // Get selected layers
                app.beginUndoGroup("Create Markers");

                if (selectedLayers.length > 0) {
                    // Apply markers to the selected layer(s)
                    for (var i = 0; i < selectedLayers.length; i++) {
                        var layer = selectedLayers[i];
                        var layerDuration = layer.outPoint - layer.inPoint;

                        if (userChoice === 'frames') {
                            var totalFrames = layerDuration * comp.frameRate;
                            for (var j = 0; j <= totalFrames; j += interval) {
                                var time = layer.inPoint + (j / comp.frameRate);
                                layer.property("Marker").setValueAtTime(time, new MarkerValue(j/interval+1));
                            }
                        } else if (userChoice === 'seconds') {
                            for (var k = 0; k <= layerDuration; k += interval) {
                                var time = layer.inPoint + k;
                                layer.property("Marker").setValueAtTime(time, new MarkerValue(k + "s"));
                            }
                        }
                    }
                    alert("Markers added to selected layer(s)!");
                } else {
                    // Apply markers to the composition
                    var totalFrames = comp.duration * comp.frameRate;

                    if (userChoice === 'frames') {
                        for (var l = 0; l <= totalFrames; l += interval) {
                            var time = l / comp.frameRate;
                            comp.markerProperty.setValueAtTime(time, new MarkerValue(l));
                        }
                    } else if (userChoice === 'seconds') {
                        for (var m = 0; m <= comp.duration; m += interval) {
                            comp.markerProperty.setValueAtTime(m, new MarkerValue(m + "s"));
                        }
                    }
                    alert("Markers added to the composition!");
                }

                app.endUndoGroup();
            } else {
                alert("Please select a composition.");
            }
        }
    }
}
