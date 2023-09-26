try{
    var adjLayer = app.project.activeItem.layers.addSolid([1,1,1], "Adjustment Layer", app.project.activeItem.width, app.project.activeItem.height, app.project.activeItem.pixelAspect, app.project.activeItem.duration);
    adjLayer.name = 'cc'
    adjLayer.label =8;
    adjLayer.adjustmentLayer = true;
    adjLayer.effect.addProperty("Curves");
    }
catch (e) {
    alert (e);
    }
