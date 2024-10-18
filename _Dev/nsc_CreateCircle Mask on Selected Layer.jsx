var comp = app.project.activeItem;

function createCircularMask(layer) {
  var ratio = 0.5523;
  var centerX = comp.width / 2;
  var centerY = comp.height / 2;

  var h = centerX;
  var v = h;
  var th = h * ratio;
  var tv = v * ratio;

  var newMask = layer.Masks.addProperty("ADBE Mask Atom");
  newMask.maskMode = MaskMode.ADD;

  var myProperty = newMask.property("ADBE Mask Shape");
  var myShape = myProperty.value;

  myShape.vertices = [[h - centerX, -centerY], [-centerX, v - centerY], [h - centerX, 2 * v - centerY], [2 * h - centerX, v - centerY]];
  myShape.inTangents = [[th, 0], [0, -tv], [-th, 0], [0, tv]];
  myShape.outTangents = [[-th, 0], [0, tv], [th, 0], [0, -tv]];
  myShape.closed = true;

  myProperty.setValue(myShape);

  return newMask;
}

// Check if there's an active composition
if (comp && comp instanceof CompItem) {
  // Check if there's a selected layer in the composition
  if (comp.selectedLayers.length > 0) {
    var selectedLayer = comp.selectedLayers[0];
    // Create a circular mask on the selected layer
    var mask = createCircularMask(selectedLayer);
  } else {
    alert("Please select a layer in the composition.");
  }
} else {
  alert("Please open a composition.");
}
