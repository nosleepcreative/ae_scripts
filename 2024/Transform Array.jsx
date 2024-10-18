
var filePath1 = "C:/Users/Desmond/Documents/Adobe/After Effects 2024/User Presets/03.02 Behaviors/E-1 Effectors/Transform Array - Master.ffx"; 
var filePath2 = "C:/Users/Desmond/Documents/Adobe/After Effects 2024/User Presets/03.02 Behaviors/E-1 Effectors/Transform Array - Child.ffx";

function applyFFXPresetToLayer(layer, filePath) {
    var ffxFile = new File(filePath);
    if (ffxFile.exists) {
        layer.applyPreset(ffxFile);
    } else {
        alert(ffxFile.exists ? "Invalid layer." : "Preset file not found.");
    }
}


function createGuideShapeLayer() {
    var comp = app.project.activeItem; // Get the active composition
    if (comp && comp instanceof CompItem) {
        app.beginUndoGroup("Create GRP Guide Layer");
        var selectedLayers = app.project.activeItem.selectedLayers;

        // Create a new empty shape layer
        var shapeLayer = comp.layers.addShape();
        shapeLayer.name = "Transform Array Master"; 
        shapeLayer.guideLayer = true;
        shapeLayer.label = 9;

        var layerToParentTo = shapeLayer;
        applyFFXPresetToLayer(layerToParentTo, filePath1);
        // Parent selected layers to the new shape layer
        for (var i = 0; i < selectedLayers.length; i++) {
            if (selectedLayers[i] != layerToParentTo) {
                selectedLayers[i].parent = layerToParentTo;
                applyFFXPresetToLayer(selectedLayers[i], filePath2)
            }
        }

        app.endUndoGroup();
        return shapeLayer;
    } else {
        alert("Please select a composition.");
    }
}

 createGuideShapeLayer();
