



// select layers
// List layers & select target

// SETUP
var comp = app.project.activeItem
var mySelectedLayers = comp.selectedLayers;
var numlayers = comp.numLayers;

// Get target layer array
var dropdown1_array= [];
for(var i=1;i<numlayers;i++){
    dropdown1_array[i] = comp.layer(i).name; // puts all layers into an array
}
alert(dropdown1_array);

app.beginUndoGroup("targetValueAtTime");
/* if (mySelectedLayers.length > 0){
	var myLayer = app.project.a
    ctiveItem.selectedLayers[0];


// Create controls
var myNull= comp.layers.addNull();comp
myNull.name= "CONTROL";
var delay = myNull.property("Effects").addProperty("Slider Control");
myColumns.name = "Delay"


// Get target values
var targetPos = target.transform.position.valueAtTime(time-inPoint+delay);
var targetScale = target.transform.scale.valueAtTime(time-inPoint+delay);
var targetRot = target.transform.scale.valueAtTime(time-inPoint+delay);

// Add expressions to selected layers
for(var i = 1; i <= comp.numLayers; i++){
    comp.layer(i).transform.position.expression = targetPos;
    comp.layer(i).transform.scale.expression = targetScale;
    comp.layer(i).transform.scale.expression = targetRot;
}

if(checkboxX == 1 && checkboxY ==0)

[value[0],value[1],value[2]]
value[1].expression =

*/
