//nsc_pos_random_radial

var thisComp = app.project.activeItem;
var myLayers = thisComp.selectedLayers;
var myNumLayers = myLayers.length;

var x = thisComp.width;
var y = thisComp.height;
var myX, myY, randRadius;

function userP() {
    var userPrompt = prompt('Please enter min and max radius or constant radius', "100,500");
    var radius = userPrompt.split(",");
    if (radius.length == 1) {
        radius = [radius, radius]
    };
    return userPrompt
}

function getRndNum(min, max) {
    return Math.random() * (max - min) + min;
}


function distanceVector(v1, v2) {
    var dx = v1[0] - v2[0];
    var dy = v1[1] - v2[1];
    return Math.sqrt(dx * dx + dy * dy);
}

function radialRand() {
    for (i = 0; i < myLayers.length; i++) {
        theta = getRndNum(0, 1) * Math.PI * 2;
        randRadius = getRndNum(parseInt(radius[0]), parseInt(radius[1]));
        myX = randRadius * Math.cos(theta) + x / 2;
        myY = randRadius * Math.sin(theta) + y / 2;
        myLayers[i].property("Position").setValue([myX, myY]);
        // myLayers[i].property("Position").setValue([x,y])

    }
}

function radialEven(radius, numLayers) {
    for (i = 0; i < numLayers; i++) {
        theta = (i + 1) / numLayers * Math.PI * 2;
        myX = radius * Math.cos(theta) + x / 2;
        myY = radius * Math.sin(theta) + y / 2;
        myLayers[i].property("Position").setValue([myX, myY]);
        // myLayers[i].property("Position").setValue([x,y])
    }

}

//__________________________________________________________________________________________

function userP_2() {
    var userPrompt = prompt('Please enter numRings & max radius', "5,500");
    var userVar = userPrompt.split(",");
    userNumRings = parseInt(userVar[0]);
    userRadius = parseInt(userVar[1]);
    return userNumRings, userRadius
}


//__________________________________________________________________________________________

function radialEvenMultiple(numRings, numLayers, radius) {
    var inc = radius / numRings;

    // generate array with empty arrays
    var myGrp = []
    var seqList = []
    var grpArr = []
    for (i = 0; i <= (numRings); i++) {
        grpArr[i] = []
    }

    for (i = 0; i < numLayers; i++) {
        myIndex = Math.ceil(getRndNum(0, numRings));
        myGrp[i] = myIndex; // grp that belongs to
        grpArr[myIndex - 1].push('1'); // add ele to the group
        seqList[i] = grpArr[myIndex - 1].length; //  get ele num
        // alert('grp: ' +myIndex + '\nseq: '+seqList[i])
    }
    // alert(grpArr[0].length +','+ grpArr[1].length)
    // alert(seqList)
    for (i = 0; i < numLayers; i++) {
        var myRadius = myGrp[i] * inc;
        var theta = seqList[i] / (grpArr[myGrp[i] - 1].length) * Math.PI * 2;

        var myX = myRadius * Math.cos(theta) //+ x / 2;
        var myY = myRadius * Math.sin(theta) //+ y / 2;
        var pos = [myX, myY];
        if (myLayers[i].hasParent != 0) {
            pos += [x, y] / 2;
        } else {
            pos += [x, y];
            pos -= [960, 540];
        }
        myLayers[i].property("Position").setValue(pos);

    }
}
//__________________________________________________________________________________________
app.beginUndoGroup("undo");

// radialRand()
// radialEven(500,myNumLayers)
userP_2()
radialEvenMultiple(userNumRings, myNumLayers, userRadius)