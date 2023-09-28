/*

 */


var myComp = app.project.activeItem;
var myLayers = myComp.selectedLayers;

// generate array of selected layers' source names
function arraySource(array) {
    var arrSrc = [];
    for (i = 0; i < array.length; i++) {

        arrSrc.push(array[i].source.name);
    }
    return arrSrc;
}

// generate array of unique names
function arrayCompress(array) {
    var str = array.sort().join('\r') + '\r';
    str = str.replace(/([^\r]+\r)(\1)+/g, '$1');
    str = str.replace(/\r$/, '');
    return str.split('\r');
}

// sort array source into groups
function arraySort(array, groups) {
    // why array sorted
    // groups array
    var groupMembers = [];
    var groupIndex = [];
    var data = [groupMembers, groupIndex]

    // create 2d arrays
    for (var j = 0; j < groups.length; j++) {
        groupMembers[j] = [];
    }
    //sorting - check through each group
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < groups.length; j++) {
            // loop through uniqueNames
            if (array[i] == groups[j]) {

                groupMembers[j].push(array[i]);
                groupIndex.push(j);

            }
        }
    }
    alert(data[0][0])

    return data;
    // return groupMembers;

}

//generate array with all element based on grp number
function genUniqueSeq(array) {
    var seq = [];
    for (i = 0; i < array.length; i++) {
        for (j = 0; j < array[i].length; j++)
            seq.push(i);
    }
    return seq;
}

function getRandNum(max) {
    var x = Math.floor(Math.random() * max);
    return x;
};
//
function uniqueSeq(array) {
    var arrayNum = array.length;
    var myLayerSource = arraySource(array);
    var uniqueNames = arrayCompress(myLayerSource);
    myLayerSource = arraySource(array); // restore array - CBB


    var numGroups = uniqueNames.length;

    var sortedArray = arraySort(myLayerSource, uniqueNames)
    var groupMembers = sortedArray[0]; // 2d array
    var groupIndex = sortedArray[1];
    var choice;
    var seq = [];
    var seqGrpIndex = [];
    var groupCount = numGroups;
    var selectedGrp;

    for (i = arrayNum; i > 0; i--) {
        choice = getRandNum(i);

        if (seq.length > 0) {

            while ((groupIndex[choice] == seqGrpIndex[seq.length - 1]) && (groupCount != 1)) {
                choice = getRandNum(i);
            }
        }

        // layer sequencing & group index push
        seq.push(array[choice]);
        seqGrpIndex.push(groupIndex[choice]);

        // remove the selected layer from source array
        array.splice(choice, 1);

        // specify the group
        selectedGrp = groupIndex[choice];

        // remove the selected layer from group index array
        groupIndex.splice(choice, 1);

        // Subtract the length of a group
        groupMembers[selectedGrp].splice(0, 1);


        // check num of elements in groups
        groupCount = 0;
        for (var j = 0; j < numGroups; j++) {
            if (groupMembers[j].length > 0) {
                // alert("grp " + j + " has " + groupMembers[j].length + " member")
                groupCount += 1;
            }
        }
        // alert("the available group is " + groupCount + "\nstarting loop")

    }
    return seq;
}
// alert(uniqueSeq(myLayers));
var mySeq = uniqueSeq(myLayers);
for (i = 0; i < mySeq.length; i++) {
    mySeq[i].transform.position.setValue([i * 50, 150]);
}