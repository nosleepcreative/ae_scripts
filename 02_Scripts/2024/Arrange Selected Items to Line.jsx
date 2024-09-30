{
    // Use confirm to ask if user wants to set interval in frames (OK = Frames, Cancel = Seconds)
    var useFrames = confirm("Would you like to set the interval in frames? (OK = Frames, Cancel = Seconds)");

    // Ask user to input the interval value
    var interval = parseFloat(prompt("Enter the interval value (positive number):", "10"));

    if (isNaN(interval) || interval <= 0) {
        alert("Invalid interval value. Please enter a positive number.");
    } else {
        // Get the active composition
        var comp = app.project.activeItem;

        if (comp && comp instanceof CompItem) {
            app.beginUndoGroup("Create Markers");

            // Calculate the total duration of the composition in frames
            var totalFrames = comp.duration * comp.frameRate;

            // Create markers based on the user's choice of frames or seconds
            if (useFrames) {
                // User chose frames
                for (var i = 0; i <= totalFrames; i += interval) {
                    var time = i / comp.frameRate;
                    comp.markerProperty.setValueAtTime(time, new MarkerValue(i));
                }
            } else {
                // User chose seconds
                for (var j = 0; j <= comp.duration; j += interval) {
                    comp.markerProperty.setValueAtTime(j, new MarkerValue(j));
                }
            }

            app.endUndoGroup();
            alert("Markers added successfully!");
        } else {
            alert("Please select a composition.");
        }
    }
}
