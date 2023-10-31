// Function to sort an array into a unique sequence

function sortUniqueArray(array) {
    // Nested function to generate a random number up to a maximum value
    function getRandNum(max) {
        return Math.floor(Math.random() * max);
    }

    // Nested function to extract the source name of layers in an array
    function arraySource(array) {
        var arrSrc = [];
        for (var i = 0; i < array.length; i++) {
            arrSrc.push(array[i].source.name);
        }
        return arrSrc;
    }

    // Nested function to compress an array to unique values
    function arrayCompress(array) {
        array.sort();
        var uniqueArray = [];
        for (var i = 0; i < array.length; i++) {
            if (array[i] !== array[i-1]) {
                uniqueArray.push(array[i]);
            }
        }
        return uniqueArray;
    }

    var seq = [];
    var workingArray = array.slice();  // Create a copy to work with
    while (workingArray.length > 0) {
        var str = arraySource(workingArray);
        var groups = arrayCompress(str).length;
        var randIndex = getRandNum(workingArray.length);
        var randElem = workingArray[randIndex];

        // Check for non-repeating
        if (seq.length > 0) {
            while (groups !== 1 && seq[seq.length - 1].source.name === randElem.source.name) {
                randIndex = getRandNum(workingArray.length);
                randElem = workingArray[randIndex];
            }
        }

        // Append & remove
        seq.push(randElem);
        workingArray.splice(randIndex, 1);
    }
    return seq;
}
