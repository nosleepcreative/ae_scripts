// Check if a composition is active
if (app.project.activeItem instanceof CompItem) {
    var selectedLayers = app.project.activeItem.selectedLayers;
    
    if (selectedLayers.length === 1) {
        var selectedLayer = selectedLayers[0];
        selectedLayer.guideLayer = !selectedLayer.guideLayer;
        selectedLayer.name = "REFERENCE EDIT";
        selectedLayer.label = 14;
        // Add FFX from local directory
        var ffxFilePath = "C:/Users/Desmond/Documents/Adobe/After Effects 2023/User Presets/Utility - Guides/Set Reference Position.ffx";
        if (ffxFile.exists) {
            selectedLayer.applyPreset(ffxFile);
        } else {
            alert("Preset file not found!");
        }
      
    } else if (selectedLayers.length === 0) {
        alert("Please select a layer in the active composition.");
    } else {
        alert("Please select only one layer in the active composition.");
    }
} else {
    alert("Please open a composition to use this script.");
}
