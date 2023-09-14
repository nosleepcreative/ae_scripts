// Check if there is an active composition
if (app.project.activeItem && app.project.activeItem instanceof CompItem) {
    var myComp = app.project.activeItem;
    
    // Check if there is at least one layer in the composition
    if (myComp.numLayers > 0) {
        var thisLayer = myComp.layer(1);
        var myCounter = 0;
        
        // Loop
        while (myCounter < 10) {
            var dupLayer = thisLayer.duplicate();
            dupLayer.rotation.setValue(45 * myCounter);
            myCounter = myCounter + 1;
        }
    } else {
        alert("There are no layers in the composition.");
    }
} else {
    alert("No active composition found.");
}
