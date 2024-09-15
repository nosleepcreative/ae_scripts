{
    function arrangeItemsInGridComp() {
        // Ensure the script runs in a valid project context
        if (app.project === null) {
            alert("Please open a project first.");
            return;
        }

        // Get the selected items
        var selectedItems = app.project.selection;

        // Ensure at least one item is selected
        if (selectedItems.length < 1) {
            alert("Please select at least one item in the project panel.");
            return;
        }

        // Check if all selected items are AVLayer, CompItem, or FootageItem
        var validSelection = true;
        for (var i = 0; i < selectedItems.length; i++) {
            if (!(selectedItems[i] instanceof AVLayer || selectedItems[i] instanceof CompItem || selectedItems[i] instanceof FootageItem)) {
                validSelection = false;
                break;
            }
        }

        if (!validSelection) {
            alert("Please select only photo, video, or composition items.");
            return;
        }

        // Prompt user for rows and columns
        var rows = parseInt(prompt("Enter the number of rows:", "2"), 10);
        var columns = parseInt(prompt("Enter the number of columns:", "2"), 10);

        // Validate input
        if (isNaN(rows) || isNaN(columns) || rows < 1 || columns < 1) {
            alert("Invalid input. Please enter positive integers for rows and columns.");
            return;
        }

        // Calculate grid size and determine composition dimensions
        var maxItemWidth = 0;
        var maxItemHeight = 0;
        var maxDuration = 0;
        var frameRate = selectedItems[0].frameRate;

        // Determine the maximum item dimensions
        for (var j = 0; j < selectedItems.length; j++) {
            var item = selectedItems[j];
            maxItemWidth = Math.max(maxItemWidth, item.width);
            maxItemHeight = Math.max(maxItemHeight, item.height);
            maxDuration = Math.max(maxDuration, item.duration);
        }

        // Calculate the total composition size based on grid layout
        var newCompWidth = maxItemWidth * columns;
        var newCompHeight = maxItemHeight * rows;

        // Create a new composition
        var newComp = app.project.items.addComp("Grid_Comp", newCompWidth, newCompHeight, selectedItems[0].pixelAspect, maxDuration, frameRate);

        // Add items to the new composition and position them in the grid
        for (var k = 0; k < selectedItems.length; k++) {
            var itemToAdd = selectedItems[k];
            var newLayer = newComp.layers.add(itemToAdd);

            // Calculate grid position
            var row = Math.floor(k / columns);
            var col = k % columns;

            // Position items based on grid position
            var posX = (col * maxItemWidth) + (maxItemWidth / 2);
            var posY = (row * maxItemHeight) + (maxItemHeight / 2);

            newLayer.transform.position.setValue([posX, posY]);
        }

        alert("New composition created with selected items arranged in a grid.");
    }

    // Run the function inside an undo group
    app.beginUndoGroup("Arrange Selected Items in Grid Comp");
    arrangeItemsInGridComp();
    app.endUndoGroup();
}
