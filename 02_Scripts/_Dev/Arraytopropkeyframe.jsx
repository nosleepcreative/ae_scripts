// Prompt the user for input
var userInput = prompt("Enter values separated by commas:", "100000,10000,5000,1000,1000,33.33333333");
var propertyToModify = prompt("Enter the name of the property to modify (e.g. 'Position', 'Opacity', etc.):");

// Split the user input into an array
var values = userInput.split(",");

// Get the selected layer
var selectedLayer = app.project.activeItem.selectedLayers[0];

// Get the property to modify
var property = selectedLayer.property(propertyToModify);

// Loop through the values and set keyframes at 3-second intervals
for (var i = 0; i < values.length; i++) {
    var value = parseFloat(values[i]);
    var time = i * 3;
    property.setValueAtTime(time, value);
}