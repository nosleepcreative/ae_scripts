// Function to compress an array to unique values
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