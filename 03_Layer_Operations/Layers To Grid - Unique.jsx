// Setup
var myComp = app.project.activeItem;
var myLayers = myComp.selectedLayers;
// ----------------------------------------

// Utilities import
function getRandNum(max) {
    var x = Math.floor(Math.random() * max);
    return x;
};

function arraySource(array) {
    var arrSrc = [];
    for (i = 0; i < array.length; i++) {
        arrSrc.push(array[i].source.name);
    }
    return arrSrc;
}

function arrayCompress(array) {
    // generate array of unique names
    var str = array.sort().join('\r') + '\r';
    str = str.replace(/([^\r]+\r)(\1)+/g, '$1');
    str = str.replace(/\r$/, '');
    return str.split('\r');
}

// ----------------------------------------

function sortUniqueArray(array) {
    var seq = [];
    var str = arraySource(array);
    var i = array.length;
    while (i > 0) {
        var groups = arrayCompress(str).length;
        var randIndex = getRandNum(array.length); // random element index
        var randElem = array[randIndex]; // element selection

        // check for non-repeating
        if (seq.length > 0) {
            while (groups != 1 && seq[seq.length - 1].source.name == randElem.source.name) {
                var randIndex = getRandNum(array.length);
                var randElem = array[randIndex];
            }
        }

        // append & remove
        seq.push(randElem);
        array.splice(randIndex, 1);

        i--;
    }
    return seq;
}


function tileByDistance(layers, hSpace, vSpace, threshold) {
    app.beginUndoGroup("tileLayers");
    // Set start position
    var currentTime = app.project.activeItem.time;
    // var startPos = [0, 0];
    var startPos = [layers[0].sourceRectAtTime(currentTime, false).width * layers[0].transform.scale.value[0], layers[0].sourceRectAtTime(currentTime, false).height * layers[0].transform.scale.value[1]] / 100 / 2;
    layers[0].transform.position.setValue(startPos);

    // Tile layers
    for (i = 1; i < layers.length; i++) {
        myLayer = layers[i];
        previousLayer = layers[i - 1];

        s1 = myLayer.sourceRectAtTime(currentTime, false).width * myLayer.transform.scale.value[0] / 100 / 2;
        s2 = previousLayer.sourceRectAtTime(currentTime, false).width * previousLayer.transform.scale.value[0] / 100 / 2;
        xPos = previousLayer.transform.position.value[0] + s1 + hSpace + s2;
        yPos = previousLayer.transform.position.value[1];

        if (xPos > threshold) {
            xPos = getRandNum(s1);
            yPos += vSpace;
        }

        myLayer.transform.position.setValue([xPos, yPos]);
    }
}
// ----------------------------------------

// Main
if (myLayers != 0) {
    var mySeq = sortUniqueArray(myLayers);
    tileByDistance(mySeq, 0, 0, 1920);
} else {
    alert("No layers are selected")
}