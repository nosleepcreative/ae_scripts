// Get input string and its length
var str = value;
var strLength = str.length;

// Get effect controls
var cb = effect("upperToLower")("Checkbox");
var pct = effect("Range Control (%)")("Slider");

// Calculate range of characters to modify
var pctNormalized = pct % 100;
var pctRangeStart = Math.floor(pct / 100) * strLength;
var pctRangeEnd = linear(pctNormalized, 0, 100, 0, strLength);
var myCharRange = Math.ceil(pctRangeStart + pctRangeEnd);

// Modify characters within range
for (var i = 0; i < myCharRange; i++) {
  var charIndex = i % strLength;
  var curChar = str.charAt(charIndex);
  var isUpper = (Math.ceil((i + 1) / strLength) - 1) % 2 === 0;
  var newChar = isUpper ? (cb ? curChar.toLowerCase() : curChar.toUpperCase()) :
                          (cb ? curChar.toUpperCase() : curChar.toLowerCase());
  str = str.substr(0, charIndex) + newChar + str.substr(charIndex + 1);
}

// Return modified string
str