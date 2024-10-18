// Function to add text layers based on keyboard state
function addTextLayers(comp) {
    var centerX = comp.width / 2;
    var centerY = comp.height / 2;

    // Function to create a text layer with given parameters
    function createTextLayer(text, fontSize, font, posY, textName) {
        var textLayer = comp.layers.addText(text);
        var textProp = textLayer.property("Source Text");
        var textDocument = textProp.value;
        //textDocument.font = font;
        textDocument.fontSize = fontSize;
        textDocument.justification = ParagraphJustification.CENTER_JUSTIFY;
        textProp.setValue(textDocument);
        textLayer.property("Position").setValue([centerX, posY]);
        textLayer.name = textName;
    }

    // Check for key states: Alt and Shift
    var keyboardState = ScriptUI.environment.keyboardState;
    
    if (keyboardState.altKey) {
        // Alt key held: Create 3 lines of text
        createTextLayer("The quick brown fox jumps over the lazy dog", 65, "ArialMT", centerY - 75, "Line 1");
        createTextLayer("Insert Line 2 Text", 100, "Arial-BoldMT", centerY, "Line 2");
        createTextLayer("Insert Line 3 Text", 65, "ArialMT", centerY + 75, "Line 3");
    } else if (keyboardState.shiftKey) {
        // Shift key held: Create 2 lines of text, first line larger
        createTextLayer("The quick brown fox", 100, "Arial-BoldMT", centerY - 30, "Line 1");
        createTextLayer("jumps over the lazy dog", 65, "ArialMT", centerY + 40, "Line 2");
    } else {
        // Default: Create 2 lines of text with the same font size
        createTextLayer("The quick brown fox", 65, "ArialMT", centerY - 16, "Line 1");
        createTextLayer("jumps over the lazy dog", 65, "ArialMT", centerY + 54, "Line 2");
    }
}

// Main script execution
var comp = app.project.activeItem;
if (comp && comp instanceof CompItem) {
    app.beginUndoGroup("Add Text Layers");
    addTextLayers(comp);
    app.endUndoGroup();
} else {
    alert("Please select an active composition.");
}
