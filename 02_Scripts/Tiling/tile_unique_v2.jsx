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

function groupBySrc(array) {
    var groupedElements = [];
    var groups = arrayCompress(arraySource(array));
    //create 2d arrays
    for (var i = 0; i < groups.length; i++) {
        groupedElements.push([]);
    }

    //sorting - check through each group
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < groups.length; j++) {
            // loop through uniqueNames
            if (array[i].source.name == groups[j]) {
                groupedElements[j].push(array[i]);
            }
        }
    }
    return groupedElements
}
// ----------------------------------------

function sortUniqueArray(array) {
    var seq = [];
    var groups = groupBySrc(array);
    var groupCount = groups.length;
    var i = array.length;
    while (i > 0) {
        var randGrp = groups[getRandNum(groupCount)]; // random group selection
        var randIndex = getRandNum(randGrp.length); // random element index
        var randElem = randGrp[randIndex]; // random selected selection
        // if there is more than 1 group & unique current element
        if (seq.length > 0) {

            while (groupCount != 1 && seq[seq.length - 1].source.name == randElem.source.name) {
                // alert("groupCount= " + groupCount + "\nselected group length: " + randGrp.length);
                var randGrp = groups[getRandNum(groupCount)];
                var randIndex = getRandNum(randGrp.length);
                var randElem = randGrp[randIndex];
            }
        }

        // append & remove
        seq.push(randElem);
        randGrp.splice(randIndex, 1);

        // update groupCount
        if (groupCount != 1) {
            for (var j = 0; j < groupCount; j++) {
                if (groups[j].length == 0) {
                    groups.splice(j, 1);
                    groupCount--;
                }
            }
        }
        i--;
    }
    return seq;
}


function tileByDistance(layers, hSpace, vSpace, threshold) {
    app.beginUndoGroup("tileLayers");
    // Set start position
    var currentTime = app.project.activeItem.time;
    // var startPos = [0, 0];
    var startPos = [layers[0].sourceRectAtTime(currentTime, false).width * myLayer.transform.scale.value[0], layers[0].sourceRectAtTime(currentTime, false).height * myLayer.transform.scale.value[1]] / 100 / 2;
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
    tileByDistance(mySeq, 0, 50, 1920);
    // for (i = 0; i < mySeq.length; i++) {
    //     mySeq[i].transform.position.setValue([i * 50, 150]);
} else {
    alert("No layers are selected")
}