// Function to extract the source name of layers in an array
function arraySource(array) {
    var arrSrc = [];
    for (var i = 0; i < array.length; i++) {
        arrSrc.push(array[i].source.name);
    }
    return arrSrc;
}