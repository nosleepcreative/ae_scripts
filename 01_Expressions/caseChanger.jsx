/*Theory
The map() method creates a new array populated with the results of calling a provided function on every element in the calling array. 1. Convert the string into an array so that we can use a map function to change the lettercase IF the index is the same
*/

// function declaration
function switchLetterCase(letter) {
    // 0 — uppercase: 65-91 // 1 — lowercase 97, 122
    var curCharCase;
    var curCharCode = letter.charCodeAt()
    if (curCharCode >= 65 && curCharCode <= 91) curCharCase = 0;
    else curCharCase = 1;
    letter = curCharCase == 0 ? letter.toLowerCase() : letter.toUpperCase();
    return letter;
}

// setup
var str = text.sourceText.value;
var arr = str.split('');
var v = arr;
var strLength = arr.length;
var pct = effect("Range Control (%)")("Slider");
var repeatMap = 1 + Math.floor(pct / 100);
for (i = 0; i < repeatMap; i++) {
    var rangeSel = Math.floor(linear(pct - (i * 100), 0, 100, 0, strLength)) - 1
    curIndex = rangeSel
    v = arr.map((item, index) => index <= curIndex ? switchLetterCase(item) : item);
    arr = v;
}
arr.join('')