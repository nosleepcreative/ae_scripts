function arrangeSelectedItemsInGrid() {
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

    // Prompt the user for the number of columns and rows
    var columns = parseInt(prompt("Enter the number of columns:", 3), 10);
    var rows = parseInt(prompt("Enter the number of rows:", Math.ceil(selectedItems.length / columns)), 10);

    // Validate input
    if (isNaN(columns) || columns <= 0 || isNaN(rows) || rows <= 0) {
        alert("Invalid input for columns or rows. Please enter positive numbers.");
        return;
    }

    // Calculate grid size
    var gridWidth = 0;
    var gridHeight = 0;
    var maxDuration = 0;
    var frameRate = selectedItems[0].frameRate || 30;  // Default frame rate if not provided

    // Determine the maximum width and height of the items
    for (var i = 0; i < selectedItems.length; i++) {
        var item = selectedItems[i];

        if (item.hasOwnProperty("width") && item.hasOwnProperty("height")) {
            gridWidth = Math.max(gridWidth, item.width);
            gridHeight = Math.max(gridHeight, item.height);
            maxDuration = Math.max(maxDuration, item.duration || 10);  // Use default duration if undefined
        }
    }

    // Calculate composition size based on grid size
    var newCompWidth = gridWidth * columns;
    var newCompHeight = gridHeight * rows;

    // Create a new composition
    var compName = "Grid_Comp_";
    var newComp = app.project.items.addComp(compName, newCompWidth, newCompHeight, selectedItems[0].pixelAspect || 1, maxDuration, frameRate);

    // Arrange items into grid
    for (var i = 0; i < selectedItems.length; i++) {
        var item = selectedItems[i];

        // Add the item to the composition as a new layer
        var newLayer = newComp.layers.add(item);

        // Calculate grid position
        var col = i % columns;
        var row = Math.floor(i / columns);

        // Calculate position in the grid
        var xPos = (col * gridWidth) + (gridWidth / 2);
        var yPos = (row * gridHeight) + (gridHeight / 2);

        // Set the position of the layer
        newLayer.transform.position.setValue([xPos, yPos]);
    }

    alert("New composition created with selected items arranged in a " + columns + "x" + rows + " grid.");
}

// Run the function inside an undo group
app.beginUndoGroup("Arrange Selected Items in Grid");
arrangeSelectedItemsInGrid();
app.endUndoGroup();
