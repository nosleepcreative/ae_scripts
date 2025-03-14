(function setKeyframes() {
    var comp = app.project.activeItem;
    if (!comp || !(comp instanceof CompItem)) {
        alert("Please select a composition.");
        return;
    }
    
    var selectedLayer = comp.selectedLayers[0];
    if (!selectedLayer) {
        alert("Please select a layer.");
        return;
    }
    
    var selectedProperty = comp.selectedProperties[0];
    if (!selectedProperty || !(selectedProperty instanceof Property)) {
        alert("Please select a property to apply keyframes.");
        return;
    }
    
    var durationFrames = parseInt(prompt("Enter duration of each section (frames):", 40));
    var transitionFrames = parseInt(prompt("Enter transition duration (frames):", 20));
    var intervalValue = parseInt(prompt("Enter interval value (px):", 1200));
    
    if (isNaN(durationFrames) || isNaN(transitionFrames) || isNaN(intervalValue)) {
        alert("Invalid input. Please enter numerical values.");
        return;
    }
    
    app.beginUndoGroup("Set Keyframes");
    
    var frameRate = comp.frameRate;
    var timeStep = durationFrames / frameRate;
    var transitionStep = transitionFrames / frameRate;
    var time = 0;
    var value = 0;
    
    while (time < comp.duration) {
        selectedProperty.setValueAtTime(time, value); // Hold
        time += transitionStep;
        if (time >= comp.duration) break;
        value += intervalValue;
        selectedProperty.setValueAtTime(time, value); // Transition
        time += timeStep;
    }
    
    app.endUndoGroup();
})();