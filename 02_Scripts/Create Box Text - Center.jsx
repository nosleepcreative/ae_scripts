app.beginUndoGroup("Undo")

// Create a new text box
var textBox = app.project.activeItem.layers.addBoxText([1000, 100]);
textBox.name = "TextBox";

// Insert Text
var myTextSource = textBox.property("Source Text");
myTextSource.setValue("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");

// Position the text box in the center of the composition
var compWidth = app.project.activeItem.width;
var compHeight = app.project.activeItem.height;
textBox.position.setValue([compWidth / 2, compHeight / 2]);