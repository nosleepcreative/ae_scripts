// Need to be able to specify rows/columnss for horizontal/vertical

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

        var newCompWidth = isHorizontal ? totalWidth : maxWidth;
        var newCompHeight = isHorizontal ? maxHeight : totalHeight;

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
        var currentPosition = 0;
        for (var i = 0; i < selectedItems.length; i++) {
            var item = selectedItems[i];
            
            // Add the item to the composition as a new layer
            var newLayer = newComp.layers.add(item);

            // Calculate position and layout
            var position;
            if (isHorizontal) {
                position = [currentPosition + item.width / 2, newCompHeight / 2];
                newLayer.transform.position.setValue(position);
                currentPosition += item.width;
            } else {
                position = [newCompWidth / 2, currentPosition + item.height / 2];
                newLayer.transform.position.setValue(position);
                currentPosition += item.height;
            }

            // Add a text layer displaying the item's name
            var textLayer = newComp.layers.addText(item.name);
            
            // Link text to item name via expression
            textLayer.property("Source Text").expression = 'thisComp.layer("' + item.name + '").name';

            // Position the text layer just below the item
            var textPosition = [position[0], position[1] + item.height / 2 + 20];  // Adjust the offset as needed
            textLayer.transform.position.setValue(textPosition);
        }

        alert("New composition created with selected items arranged " + (isHorizontal ? "horizontally." : "vertically."));
    }

    // Run the function inside an undo group
    app.beginUndoGroup("Arrange Selected Items in New Comp");
    arrangeSelectedItemsInNewComp();
    app.endUndoGroup();
}
