var thisComp = app.project.activeItem;
var myLayers = thisComp.selectedLayers;
var x = thisComp.width;
var y = thisComp.height;
var z = 500;
var randX, randY, randZ;

function getRndNum(min, max) {
    return Math.random() * (max - min) + min;
}

app.beginUndoGroup("undo");

for (i = 0; i < myLayers.length; i++) {
    randX = getRndNum(0, x);
    randY = getRndNum(0, y);
    randZ = getRndNum(0, z);

    myLayers[i].property("Position").setValue([randX, randY, randZ]);
    // myLayers[i].property("Position").setValue([x,y])

}