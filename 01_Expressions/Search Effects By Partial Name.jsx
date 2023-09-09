// Function: search for all effects in the current After Effects layer that match the given name and return an array of their corresponding property values.

function fxSearch(fxName) {
    // Search all effects
    var effectParade = thisLayer("ADBE Effect Parade");
    var numFX = effectParade.numProperties;
    var arr = [];
    for (var i = 1; i <= numFX; i++) {
      var effect = effectParade.property(i);
      if (effect.name.toLowerCase().indexOf(fxName.toLowerCase()) > -1) {
        arr.push(effect(1));
      }
    }
    return arr;
  }
  