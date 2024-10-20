// Grid Arrangement for Selected Layers or Project Items with Shift Key and Scaling
function arrangeInGrid() {
    var comp = app.project.activeItem;
    var selectedProjectItems = app.project.selection;
    var selectedLayers = comp && comp.selectedLayers;

    // Determine if working with layers or project items
    var isLayerMode = selectedLayers && selectedLayers.length > 0;

    // Detect if Shift key is pressed
    var shiftPressed = ScriptUI.environment.keyboardState.shiftKey;

    var userInput;
    var rows, cols;

    if (isLayerMode) {
        // Handle selected layers in the active comp
        if (shiftPressed) {
            userInput = prompt("Enter the number of rows:", "3");
            rows = parseInt(userInput);

            if (isNaN(rows) || rows <= 0) {
                alert("Please enter a valid positive number for rows.");
                return;
            }
            cols = Math.ceil(selectedLayers.length / rows);
        } else {
            userInput = prompt("Enter the number of columns:", "4");
            cols = parseInt(userInput);

            if (isNaN(cols) || cols <= 0) {
                alert("Please enter a valid positive number for columns.");
                return;
            }
            rows = Math.ceil(selectedLayers.length / cols);
        }
    } else {
        // Handle selected project items
        if (selectedProjectItems.length === 0) {
            alert("Please select at least one layer or project item.");
            return;
        }

        if (shiftPressed) {
            userInput = prompt("Enter the number of rows:", "3");
            rows = parseInt(userInput);

            if (isNaN(rows) || rows <= 0) {
                alert("Please enter a valid positive number for rows.");
                return;
            }
            cols = Math.ceil(selectedProjectItems.length / rows);
        } else {
            userInput = prompt("Enter the number of columns:", "4");
            cols = parseInt(userInput);

            if (isNaN(cols) || cols <= 0) {
                alert("Please enter a valid positive number for columns.");
                return;
            }
            rows = Math.ceil(selectedProjectItems.length / cols);
        }
    }

    // Create a new composition or use the active one
    var currentDate = new Date();
    var compName = "Compare_CompGrid_" +
        ("0" + (currentDate.getMonth() + 1)).slice(-2) +
        ("0" + currentDate.getDate()).slice(-2) + "-" +
        ("0" + currentDate.getHours()).slice(-2) +
        ("0" + currentDate.getMinutes()).slice(-2);

    if (!(comp instanceof CompItem)) {
        comp = app.project.items.addComp(compName, 1920, 1080, 1, 10, 30);
        comp.label = 14;
        var colorValue = 0.9333333333333333;
        comp.bgColor = [colorValue,colorValue,colorValue];
    }


    // Calculate cell size
    var pct = 0.8;
    var compWidth = comp.width * pct;
    var cellWidth = compWidth / cols;
    var cellHeight = cellWidth * pct;
    comp.height = Math.ceil(cellHeight * rows);

    // Arrange layers or project items
    var itemsToArrange = isLayerMode ? selectedLayers : selectedProjectItems;
    for (var i = 0; i < itemsToArrange.length; i++) {
        var item = itemsToArrange[i];

        // Add project item as a new layer if needed
        var layer = isLayerMode ? item : comp.layers.add(item);

        // Calculate position
        var row = Math.floor(i / cols);
        var col = i % cols;

        var xPos = (col + 0.5) * cellWidth * (1 / pct);
        var yPos = (row + 0.5) * cellHeight;

        layer.position.setValue([xPos, yPos]);

        // Scale to fit within the grid cell
        var scaleX = (cellWidth / layer.width) * 100;
        var scaleY = (cellHeight / layer.height) * 100;
        var scaleValue = Math.min(scaleX, scaleY);

        layer.scale.setValue([scaleValue, scaleValue]);
    }

    comp.openInViewer();
    app.endUndoGroup();
}

// Run the function
app.beginUndoGroup("Arrange in Grid");
arrangeInGrid();
app.endUndoGroup();