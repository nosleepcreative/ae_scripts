// Check if a composition is active
if (app.project.activeItem instanceof CompItem) {
    var selectedLayers = app.project.activeItem.selectedLayers;
  
    // Check if any layer is selected
    if (selectedLayers.length > 0) {
      // Loop through all selected layers
      for (var i = 0; i < selectedLayers.length; i++) {
        var selectedLayer = selectedLayers[i];
        
        // Toggle the guideLayer property for the selected layer
        selectedLayer.guideLayer = !selectedLayer.guideLayer;
      }
    } else {
      alert("Please select one or more layers in the active composition.");
    }
  } else {
    alert("Please open a composition to use this script.");
  }
  