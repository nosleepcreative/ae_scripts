function createControlsNull(controlName) {
    var comp = app.project.activeItem;
    if (comp && comp instanceof CompItem) {
      var controlsNull = comp.layer(controlName);
      if (!controlsNull) {
        controlsNull = comp.layers.addNull();
        controlsNull.name = controlName;
      }
    } else {
      alert("Please open a composition in After Effects.");
    }
  }
  

controlsNull = createControlsNull("Controls");
var CBEffect = controlsNull.Effects.addProperty("ADBE Checkbox Control");
CBEffect.name = "Checkbox";

  
  var activeComp = app.project.activeItem;
  for (var i = 1; i <= activeComp.numLayers; i++) {
      var layer = activeComp.layer(i);
      if (layer != controlsNull) {
          layer.opacity.expression = 'thisComp.layer("Controls").effect("Selection")("Slider")==index ? 100 : 0;';
      }
  }
} catch (error) {
  
  
  
  // Opacity expression thisComp.layer("CONTROLS").effect("Base Visibility")("Checkbox")==0? 0:100
// MOGRT