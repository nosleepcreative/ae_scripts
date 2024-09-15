{
    function arrangeSelectedItemsInNewComp() {
        // Ensure the script runs in a valid project context
        if (!app.project) {
            alert("Please open a project first.");
            return;
        }

        // Get the selected items
        var selectedItems = app.project.selection;

        // Ensure at least one item is selected
        if (selectedItems.length === 0) {
            alert("Please select at least one item in the project panel.");
            return;
        }

        // Confirm layout choice from the user
        var isHorizontal = confirm("Arrange items side by side (Horizontal)?\nClick 'No' for Vertical arrangement.");

        // Ask the user for the number of rows (for horizontal) or columns (for vertical)
        var userInput = prompt(isHorizontal ? "Enter number of rows for horizontal layout:" : "Enter number of columns for vertical layout:", "1");
        var gridCount = parseInt(userInput);

        // Ensure valid input
        if (isNaN(gridCount) || gridCount <= 0) {
            alert("Invalid input. Please enter a positive number.");
            return;
        }

        // Initialize dimensions for the new composition
        var totalWidth = 0;
        var totalHeight = 0;
        var maxWidth = 0;
        var maxHeight = 0;
        var maxDuration = 0;
        var frameRate = selectedItems[0].frameRate || 30;  // Default frame rate if not provided

        // Calculate the dimensions of the new composition
        for (var i = 0; i < selectedItems.length; i++) {
            var item = selectedItems[i];

            if (item.hasOwnProperty("width") && item.hasOwnProperty("height")) {
                if (isHorizontal) {
                    totalWidth += item.width;
                    maxHeight = Math.max(maxHeight, item.height);
                } else {
                    totalHeight += item.height;
                    maxWidth = Math.max(maxWidth, item.width);
                }
                maxDuration = Math.max(maxDuration, item.duration || 10);  // Use default duration if undefined
            }
        }

        var newCompWidth = isHorizontal ? maxWidth * gridCount : maxWidth;
        var newCompHeight = isHorizontal ? maxHeight : maxHeight * gridCount;

        // Ensure that the width and height are within valid ranges for an After Effects composition
        newCompWidth = Math.max(4, Math.min(30000, newCompWidth));  // Width must be between 4 and 30,000
        newCompHeight = Math.max(4, Math.min(30000, newCompHeight));  // Height must be between 4 and 30,000

        var currentDate = new Date();
        var compName = "Compare_Comp_" +
            ("0" + (currentDate.getMonth() + 1)).slice(-2) + // Month (MM)
            ("0" + currentDate.getDate()).slice(-2) + "-" +  // Day (DD)
            ("0" + currentDate.getHours()).slice(-2) +       // Hour (HH)
            ("0" + currentDate.getMinutes()).slice(-2) +     // Minute (MM)
            ("0" + currentDate.getSeconds()).slice(-2);      // Second (SS)

        // Create a new composition
        var newComp = app.project.items.addComp(compName, newCompWidth, newCompHeight, selectedItems[0].pixelAspect || 1, maxDuration, frameRate);

        // Add items to the new composition and position them
        var currentRow = 0;
        var currentColumn = 0;
        for (var i = 0; i < selectedItems.length; i++) {
            var item = selectedItems[i];

            // Add the item to the composition as a new layer
            var newLayer = newComp.layers.add(item);

            // Calculate position and layout based on user input
            var position;
            if (isHorizontal) {
                position = [
                    (currentColumn * item.width) + item.width / 2,
                    (currentRow * item.height) + item.height / 2
                ];
                newLayer.transform.position.setValue(position);
                currentColumn++;
                if (currentColumn >= gridCount) {
                    currentColumn = 0;
                    currentRow++;
                }
            } else {
                position = [
                    (currentColumn * item.width) + item.width / 2,
                    (currentRow * item.height) + item.height / 2
                ];
                newLayer.transform.position.setValue(position);
                currentRow++;
                if (currentRow >= gridCount) {
                    currentRow = 0;
                    currentColumn++;
                }
            }

            // Add a text layer displaying the item's name
            var textLayer = newComp.layers.addText(item.name);
            
            // Link text to item name via expression
            textLayer.property("Source Text").expression = 'thisComp.layer("' + item.name + '").name';

            // Position the text layer just below the item
            var textPosition = [position[0], position[1] + item.height / 2 + 20];  // Adjust the offset as needed
            textLayer.transform.position.setValue(textPosition);
        }

        alert("New composition created with selected items arranged " + (isHorizontal ? "horizontally." : "vertically.") + " in " + gridCount + " " + (isHorizontal ? "row(s)." : "column(s)."));
    }

    // Run the function inside an undo group
    app.beginUndoGroup("Arrange Selected Items in New Comp");
    arrangeSelectedItemsInNewComp();
    app.endUndoGroup();
}
