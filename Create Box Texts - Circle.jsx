// Function to create rows of BoxText layers
function createTextRows(circleDiameter, numRows, userText) {
    // Check if a composition is active
    if (app.project.activeItem && app.project.activeItem instanceof CompItem) {

        // Base settings
        var rowHeight = 100;
        var myRadius = circleDiameter / 2;
        var rowSpacing = 20;

        // Get the active composition
        var comp = app.project.activeItem;
        var compWidth = comp.width;
        var compHeight = comp.height;

        // Create a null layer to serve as the center
        // var nullLayer = comp.layers.addNull();
        // nullLayer.name = "Center Null";


        // Loop to create rows of BoxText layers
        for (var i = 0; i < numRows; i++) {
            // Calculate row width
            var rowNum = ((i + 0.5) / numRows);
            var distanceFromCenter = rowNum * circleDiameter - myRadius;
            var chordLength = 2 * Math.sqrt((Math.pow(myRadius, 2) - Math.pow(distanceFromCenter, 2)))

            // Create a new text box
            var textBox = comp.layers.addBoxText([chordLength, rowHeight]);

            // Set the name of the text box (you can modify this as needed)
            textBox.name = "Row " + (i + 1);

            // Calculate the position for each row
            var yPos = i / numRows * (circleDiameter + rowSpacing); // Adjust the spacing between rows as needed

            // Position the text box at the calculated Y position
            textBox.property("Position").setValue([compWidth / 2, yPos]);

            // Add user-provided SourceText for each row
            var myTextSource = textBox.property("Source Text");
            myTextSource.setValue(userText);

            // Parent the text box to the null layer
            // textBox.parent = nullLayer;
        }
    } else {
        alert("Please select or open a composition.");
    }
}

// Prompt the user for the diameter and number of rows
var circleDiameterInput = prompt("Enter the circle diameter (maximum width of each row):", "1000");
var numRowsInput = prompt("Enter the number of rows:", "10");
var userText = prompt("Enter Text", "BEYOND THE FRAME BEYOND THE FRAME BEYOND THE FRAME BEYOND THE FRAME BEYOND THE FRAME");

// Convert user input to numbers
var circleDiameter = parseFloat(circleDiameterInput);
var numRows = parseFloat(numRowsInput);

// Check if the user canceled the prompts or entered invalid values
if (!isNaN(circleDiameter) && !isNaN(numRows)) {
    // Use app.beginUndoGroup() to create an undo group
    app.beginUndoGroup("Create Text Rows");

    // Call the createTextRows() function to create the rows with user-provided values
    createTextRows(circleDiameter, numRows, userText);

    // Use app.endUndoGroup() to end the undo group
    app.endUndoGroup();
} else {
    alert("Invalid input or canceled. Please enter valid numbers for the circle diameter and number of rows.");
}