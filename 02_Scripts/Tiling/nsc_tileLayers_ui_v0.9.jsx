var myComp = app.project.activeItem;
var myLayers = myComp.selectedLayers;
var myWidthLimit = myComp.width;
var tilePos = [
    [0, 0]
];
var pos, s1, s2;

// user variables
var shuffle = true;
var hSpace = 0;
var vSpace = 125

// debugging
if (myLayers.length == 0) {
    alert("No layers selected.")
} else {
    if (shuffle == true) {
        shuffleArray(myLayers)
    }
    tileLayers(myLayers, hSpace, vSpace, myWidthLimit);
}

////////////////////////////////////////////////////////////////////////////////

function shuffleArray(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function tileLayers(layers, hSpace, vSpace, threshold) {


    // tile everything into a row
    for (i = 1; i < layers.length; i++) {
        myLayer = layers[i];
        previousLayer = layers[i - 1];

        s1 = myLayer.sourceRectAtTime(1, false).width * myLayer.transform.scale.value[0] / 100 / 2;
        s2 = previousLayer.sourceRectAtTime(1, false).width * previousLayer.transform.scale.value[0] / 100 / 2;

        tilePos.push(tilePos[i - 1] + [s1 + hSpace + s2, 0])
    }
    // segment array into rows
    for (i = 0; i < tilePos.length; i++) {
        myLayer = layers[i];
        x = tilePos[i][0];
        y = 0;
        row = Math.floor(x / threshold);

        x -= row * threshold;

        y = row * vSpace;
        pos = [x, y];

        //myLayer.property("Position").setValue(pos);
        myLayer.transform.position.setValue(pos);
    }

}