// Check if a composition is active
if (app.project.activeItem && app.project.activeItem instanceof CompItem) {
    // Define the total height for the rows
    var totalHeight = 1000; // Total height in pixels

    // Define the number of rows and the height of each row
    var numRows = 5; // You can change this to the desired number of rows
    var rowHeight = totalHeight / numRows;

    // Get the active composition
    var comp = app.project.activeItem;
    var compWidth = comp.width;

    // Create a new text layer group to hold the rows
    var textLayerGroup = comp.layers.addNull();
    textLayerGroup.name = "Text Rows";

    // Loop to create rows of BoxText layers
    for (var i = 0; i < numRows; i++) {
        // Create a new text box
        var textBox = app.project.activeItem.layers.addBoxText([compWidth, rowHeight]);

        // Set the name of the text box (you can modify this as needed)
        textBox.name = "Row " + (i + 1);

        // Calculate the position for each row
        var yPos = i * rowHeight + rowHeight / 2;

        // Position the text box in the center horizontally and at the calculated Y position
        textBox.property("Position").setValue([compWidth / 2, yPos]);
    }
} else {
    alert("Please select or open a composition.");
}