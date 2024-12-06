// Check if a composition is active
if (app.project.activeItem instanceof CompItem) {
  var curComp = app.project.activeItem;

  // Check if a layer is selected
  if (curComp.selectedLayers.length > 0) {
    // Get the selected layer
    var selectedLayer = curComp.selectedLayers[0];
    
    // Check if the selected layer has position property
    if (selectedLayer.property("Position") instanceof Property) {
      // Get the position value
      var positionValue = selectedLayer.property("Transform").property("Position").value;
      var WidthValue = selectedLayer.sourceRectAtTime(0, 0).width;
      var HeightValue = selectedLayer.sourceRectAtTime(0, 0).height;

      // Create a shape layer
      var shapeLayer = curComp.layers.addShape();
      
      // Add a shape group to the shape layer
      var shapeGroup = shapeLayer.property("Contents").addProperty("ADBE Vector Group");
      
      // Add a rectangle shape to the shape group
      var myStar = shapeGroup.property("Contents").addProperty("ADBE Vector Shape - Rect");
      
      // Set the size of the rectangle shape
      myStar.property("ADBE Vector Rect Size").setValue([WidthValue, HeightValue]);
      
      // Set the position of the rectangle shape based on the selected layer's position
      myStar.property("ADBE Vector Rect Position").setValue([0,0]);
      
      // Add stroke and fill properties to the shape group
      shapeGroup.property("Contents").addProperty("ADBE Vector Graphic - Stroke");
      shapeGroup.property("Contents").addProperty("ADBE Vector Graphic - Fill");
    } else {
      alert("Selected layer doesn't have a position property.");
    }
  } else {
    alert("No layer selected.");
  }
} else {
  alert("No active composition.");
}
