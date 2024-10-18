// Function to create rows of BoxText layers
function createTextRows(rectangleWidth, rectangleHeight, numRows, userText) {
    // Check if a composition is active
    if (app.project.activeItem && app.project.activeItem instanceof CompItem) {

        // Base settings
        var boxHeight = 100;
        var rowSpacing = 20;

        // Get the active composition
        var comp = app.project.activeItem;
        var compWidth = comp.width;
        var compHeight = comp.height;

        // Loop to create rows of BoxText layers
        for (var i = 0; i < numRows; i++) {

            // Create a new text box
            var textBox = comp.layers.addBoxText([rectangleWidth, boxHeight]);

            // Set the name of the text box (you can modify this as needed)
            textBox.name = "Row " + (i + 1);

            // Calculate the position for each row
            var yPos = i / numRows * (rectangleHeight + rowSpacing); // Adjust the spacing between rows as needed

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
var rectangleWidthInput = prompt("Enter the rectangle Width", "1000");
var rectangleHeightInput = prompt("Enter the rectangle Height", "1000");

var numRowsInput = prompt("Enter the number of rows:", "10");
var userText = prompt("Enter Text", "MUDA MUDA MUDA MUDA MUDA MUDA MUDA MUDA MUDA MUDA MUDA MUDA MUDA MUDA MUDA");

// Convert user input to numbers
var rectangleWidth = parseFloat(rectangleWidthInput);
var rectangleHeight= parseFloat(rectangleHeightInput);
var numRows = parseFloat(numRowsInput);

// Check if the user canceled the prompts or entered invalid values
if (!isNaN(rectangleWidth) && !isNaN(rectangleHeight) && !isNaN(numRows)) {
    // Use app.beginUndoGroup() to create an undo group
    app.beginUndoGroup("Create Text Rows");

    // Call the createTextRows() function to create the rows with user-provided values
    createTextRows(rectangleWidth,rectangleHeight, numRows, userText);

    // Use app.endUndoGroup() to end the undo group
    app.endUndoGroup();
} else {
    alert("Invalid input or canceled. Please enter valid numbers for the circle diameter and number of rows.");
}