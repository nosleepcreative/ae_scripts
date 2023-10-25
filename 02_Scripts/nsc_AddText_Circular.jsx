// Define variables
var comp = app.project.activeItem; // Get the active composition
var numLayers = parseInt(prompt("Please insert the number of text layers", 12)); // Number of text layers
var myText = prompt("Please insert the text to repeat", "Lorem Ipsum"); // Text to repeat
var rotateText = confirm("Rotate text layers?"); // Rotate text layers

var radius = 500; // Radius of the circle
var centerX = comp.width / 2; // X-coordinate of the circle center
var centerY = comp.height / 2; // Y-coordinate of the circle center

// Loop to create text layers
for (var i = 0; i < numLayers; i++) {
    // Calculate angle for the current text layer
    var angle = (i / numLayers) * 2 * Math.PI;
    var rotationAngle = rotateText ? (i / numLayers) * 360 : 0;
    
    // Calculate position based on the angle and radius
    var x = centerX + radius * Math.cos(angle);
    var y = centerY + radius * Math.sin(angle);

    // Create a new text layer
    var textLayer = comp.layers.addText(myText);

    // Set the text layer's name
    textLayer.name = "Text " + i;

    // Set the text layer's position
    textLayer.position.setValue([x, y]);

    // Set the text layer's rotation
    textLayer.rotation.setValue(rotationAngle);
}
