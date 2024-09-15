// Check if a composition is active
if (app.project.activeItem instanceof CompItem) {
  var comp = app.project.activeItem;

  // Create a new null layer
  var nullLayer = comp.layers.addNull();
  nullLayer.name = "MARKERS";

  // Get the markers from the active composition
  var markers = comp.markerProperty;
  // Loop through each marker
  for (var i = 1; i <= markers.numKeys; i++) {
    var marker = markers.keyValue(i);
    var markerTime = markers.keyTime(i);
    // Create a marker on the null layer
    nullLayer.property("ADBE Marker").setValueAtTime(markerTime, new MarkerValue(marker.comment));
  }

  // Alert when the operation is complete
  alert("Markers transferred to the MARKERS null layer successfully.");
} else {
  // Alert if no composition is active
  alert("Please select an active composition.");
}
