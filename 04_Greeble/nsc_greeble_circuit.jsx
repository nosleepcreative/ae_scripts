function createLine() {
    var comp = app.project.activeItem;
    
    if (comp && comp instanceof CompItem) {
        var width = 500; // Length of the line in pixels
        var height = 2; // Thickness of the line in pixels
        var fillColor = [1, 1, 1]; // Line fill color (white in this case)
        var strokeColor = [1, 0, 0]; // Line stroke color (red in this case)
        var strokeWidth = 10; // Width of the stroke in pixels

        var shapeLayer = comp.layers.addShape();
        shapeLayer.name = "Line";

        var shapeGroup = shapeLayer.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
        //var shapePath = shapeGroup.addProperty("ADBE Vector Shape");
        var shapePath = shapeGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Group");
        shapePath.name = "LIIIIII"

        var shapeRect = new Shape();
        shapeRect.vertices = [[0, 0], [width, 0]];
        shapeRect.inTangents = [[0, 0], [0, 0]];
        shapeRect.outTangents = [[0, 0], [0, 0]];
        shapeRect.closed = false;

        shapePath.setValue(shapeRect);

        var fill = shapeGroup.addProperty("ADBE Vector Graphic - Fill");
        fill.enabled = true;
        fill.color = fillColor;

        var stroke = shapeGroup.property("Contents").addProperty("ADBE Vector Graphic - Stroke");
        stroke.enabled = true;
        stroke.property("Color").setValue(strokeColor);  
        stroke.property("Stroke Width").setValue(strokeWidth);

        shapeLayer.position.setValue([comp.width / 2, comp.height / 2]); // Position in the center of the composition
    } else {
        alert("Please select or open a composition first.");
    }
}

createLine();


