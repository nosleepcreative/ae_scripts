// After Effects Script to Render First Frame of Selected Comps in Project Panel as PNG

function renderFirstFrameOfSelectedCompsAsPNG() {
    var selectedItems = app.project.selection;
    
    if (selectedItems.length === 0) {
        alert("Please select at least one composition in the Project panel.");
        return;
    }

    app.beginUndoGroup("Render First Frame as PNG");

    for (var i = 0; i < selectedItems.length; i++) {
        var item = selectedItems[i];
        
        if (item instanceof CompItem) {
            var comp = item;

            // Add the comp to the Render Queue
            var renderQueueItem = app.project.renderQueue.items.add(comp);

            // Set the Render Queue settings to render only the first frame
            renderQueueItem.timeSpanStart = 0;
            renderQueueItem.timeSpanDuration = 1 / comp.frameRate;
        }
    }

    app.endUndoGroup();

    alert("First frame of selected compositions has been added to the Render Queue as PNG.");
}

renderFirstFrameOfSelectedCompsAsPNG();
