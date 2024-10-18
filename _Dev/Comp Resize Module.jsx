function makeParentLayerOfAllUnparented(theComp, newParent) {
    for (var i = 1; i <= theComp.numLayers; i++) {
        var curLayer = theComp.layer(i);
        var wasLocked = curLayer.locked;
        curLayer.locked = false;
        if (curLayer != newParent && curLayer.parent == null) {
            curLayer.parent = newParent;
        }
        curLayer.locked = wasLocked
    }
}

// Scales the zoom factor of every camera by the given scale_factor.
// Handles both single values and multiple keyframe values.
function scaleAllCameraZooms(theComp, scaleBy) {
    for (var i = 1; i <= theComp.numLayers; i++) {
        var curLayer = theComp.layer(i);
        if (curLayer.matchName == "ADBE Camera Layer") {
            var curZoom = curLayer.zoom;
            if (curZoom.numKeys == 0) {
                curZoom.setValue(curZoom.value * scaleBy);
            } else {
                for (var j = 1; j <= curZoom.numKeys; j++) {
                    curZoom.setValueAtKey(j, curZoom.keyValue(j) * scaleBy);
                }
            }
        }
    }
}

function onScaleClick(theComp, myWidth, myHeight) {
    var activeItem = theComp;
    // if ((activeItem == null) || !(activeItem instanceof CompItem)) {
    //     alert("Please select or open a composition first.", scriptName);
    // } else {
    //     // Validate the input field, in case the user didn't defocus it first (which often can be the case).
    //     this.parent.parent.optsRow.text_input.notify("onChange");

    var activeComp = activeItem;

    // Create a null 3D layer.
    var null3DLayer = activeItem.layers.addNull();
    null3DLayer.threeDLayer = true;

    // Set its position to (0,0,0).
    null3DLayer.position.setValue([0, 0, 0]);

    // Set null3DLayer as parent of all layers that don't have parents.
    makeParentLayerOfAllUnparented(activeComp, null3DLayer);

    // Set new comp width and height.
    activeComp.width = Math.floor(activeComp.width * scale_factor);
    activeComp.height = Math.floor(activeComp.height * scale_factor);

    // Then for all cameras, scale the Zoom parameter proportionately.
    scaleAllCameraZooms(activeComp, scale_factor);

    // Set the scale of the super parent null3DLayer proportionately.
    var superParentScale = null3DLayer.scale.value;
    superParentScale[0] = superParentScale[0] * scale_factor;
    superParentScale[1] = superParentScale[1] * scale_factor;
    superParentScale[2] = superParentScale[2] * scale_factor;
    null3DLayer.scale.setValue(superParentScale);

    // Delete the super parent null3DLayer with dejumping enabled.
    null3DLayer.remove();
}


//