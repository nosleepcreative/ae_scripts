function createControlsNull(controlName) {
    var comp = app.project.activeItem;
    if (comp && comp instanceof CompItem) {
      var controlsNull = comp.layer(controlName);
      if (!controlsNull) {
        controlsNull = comp.layers.addNull();
        controlsNull.name = controlName;
        controlsNull.guideLayer = true;
        controlsNull.label = 14;
        controlsNull.moveToStart();
      }
    } else {
      alert("Please open a composition in After Effects.");
    }
  }
  
controlsNull = createControlsNull("Controls");
