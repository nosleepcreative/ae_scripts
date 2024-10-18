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
                app.beginUndoGroup("Create Markers");
                
                // Calculate the total duration of the composition in frames
                var totalFrames = comp.duration * comp.frameRate;
                
                // Create markers based on the user choice
                if (userChoice === 'frames') {
                    for (var i = 0; i <= totalFrames; i += interval) {
                        var time = i / comp.frameRate;
                        comp.markerProperty.setValueAtTime(time, new MarkerValue("Marker at " + i + " frames"));
                    }
                } else if (userChoice === 'seconds') {
                    for (var j = 0; j <= comp.duration; j += interval) {
                        comp.markerProperty.setValueAtTime(j, new MarkerValue("Marker at " + j + " seconds"));
                    }
                }
                
                app.endUndoGroup();
                alert("Markers added successfully!");
            } else {
                alert("Please select a composition.");
            }
        }
    }
}
