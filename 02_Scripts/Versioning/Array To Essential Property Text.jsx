// Get the selected layer
var layer = app.project.activeItem.selectedLayers[0];
app.beginUndoGroup("dataMerger");

// Array of values
values = [
  "LINE 01",
  "LINE 02",
  "LINE 03",

  ]
// Iterate through the array and update the text input property
for (var i = 0; i < values.length; i++) {
  // Get the value from the array
  var value = values[i];
  // Duplicate the selected layer
  var duplicatedLayer = layer.duplicate();
  duplicatedLayer.name = "SUPER_"+(i+1) 
  
  // Get the "Text Input" property
  var textInputProperty = duplicatedLayer.property("Essential Properties").property("Text Input");
  // Set the value of the "Text Input" property
    textInputProperty.setValue(value);
}


