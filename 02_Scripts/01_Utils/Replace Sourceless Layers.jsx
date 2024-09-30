// This script stores the positions of the selected layers in an array,
// removes the selected layers, and then duplicates another layer and positions
// the duplicates at the same positions as the removed layers.

// Setup
var myComp = app.project.activeItem; // Get the active composition.
var myLayers = myComp.selectedLayers; // Get the selected layers in the composition.

function storeSelPos(layers) {
    // This function stores the positions of the layers in an array.
    var arr = [];
    for (var i = 0; i < layers.length; i++) {
        arr.push(layers[i].property("Position").value);
    }
    return arr;
}

function positionItem(layer, arr) {
    // This function positions the duplicates of the specified layer at the positions in the array.
    for (var i = 0; i < arr.length; i++) {
        var dup = layer.duplicate();
        dup.property("Position").setValue(arr[i]);
    }
}

app.beginUndoGroup("undo"); // Start an undo group.

var myPos = storeSelPos(myLayers); // Store the positions of the selected layers.

positionItem(myComp.layer(3), myPos); // Duplicate and position the duplicates of layer 3.

app.endUndoGroup(); // Close the undo group.



/* OLD

// Setup
var myComp = app.project.activeItem;
var myLayers = myComp.selectedLayers;
app.beginUndoGroup("undo");

function storeSelPos(layers) {
    var arr = []
    for (i = 0; i < layers.length; i++) {
        arr.push(layers[i].property("Position").value);
        layers[i].remove();
    }
    // delete layers
    return arr;
}

function positionItem(layer, arr) {
    for (i = 0; i < arr.length; i++) {
        var dup = layer.duplicate()
        dup.property("Position").setValue(arr[i]);
    }
    0
}

var myPos = storeSelPos(myLayers);
positionItem(myComp.layer(3), myPos);*/