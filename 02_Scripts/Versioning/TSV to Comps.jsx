// AE ScriptUI to duplicate selected comp based on input list of names, sizes, duration, FPS, and comment
{
    var win = new Window("palette", "Duplicate Comps", undefined);
    win.orientation = "column";

    // Add description for input syntax
    var description = win.add("statictext", undefined, "Syntax: Name, Width, Height, Duration, FPS, Comment");
    description.alignment = "left";

    // Add an example for the syntax
    var example = win.add("statictext", undefined, "Example: D+_HBBO_CCA-JFK_946x480,946,480,15,30,This is a comment");
    example.alignment = "left";

    // Add a text area for input
    var inputText = win.add("edittext", undefined, "", { multiline: true });
    inputText.preferredSize = [400, 200];

    // Add a button to trigger the script
    var runButton = win.add("button", undefined, "Duplicate Comps");

    // Button click handler
    runButton.onClick = function () {
        app.beginUndoGroup("Duplicate Comps");

        var selectedComp = app.project.activeItem;

        if (selectedComp == null || !(selectedComp instanceof CompItem)) {
            alert("Please select a comp first.");
            return;
        }

        // Parse each line of the input
        var lines = inputText.text.split("\n");
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim();
            if (line === "") continue;

            // Split the line by commas
            var components = line.split(",");

            if (components.length < 5) {
                alert("Invalid format: " + line);
                continue;
            }

            var name = components[0];
            var width = parseInt(components[1]);
            var height = parseInt(components[2]);
            var duration = parseFloat(components[3]);
            var fps = parseFloat(components[4]);
            var comment = components[5] || ""; // Optional comment

            // Duplicate the comp
            var newComp = selectedComp.duplicate();
            newComp.name = name;
            newComp.width = width;
            newComp.height = height;
            newComp.duration = duration;
            newComp.frameRate = fps;

            // Add the comment to the composition
            newComp.comment = comment;
        }

        app.endUndoGroup();
    };

    win.center();
    win.show();
}
