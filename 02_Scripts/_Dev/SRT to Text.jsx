var myComp = app.project.activeItem;
var myCompSize = [myComp.width, myComp.height] / 2
// ——————————————————————————————————————————————————————————————————————

app.beginUndoGroup("undo");

function openReadFile(myFile) {
    // Get and open txt file
    if (myFile == null) {
        alert("No path specified. Please select SRT file converted to txt.")
        var spreadsheet = File.openDialog("Please select .txt file");
    } else {
        var spreadsheet = File(myFile)
    };
    var readOK = spreadsheet.open("r");
    if (readOK) {
        var spreadsheetContents = spreadsheet.read();
    } else {
        alert("Error opening file");
    }
    return spreadsheetContents;
}

function parseSRTArray(spreadsheetContents) {
    // parse SRT into sequence by new line & whitespace
    var itemsArray = spreadsheetContents.split(/\n\s/);
    var mySrt = [];
    for (var i = 0; i < itemsArray.length; i++) {
        // Split elements by line break
        itemsArray[i] = itemsArray[i].split(/\n/);
        itemsArray[i].shift(); // remove number

        // Get start & end timecodes, and parse into time
        var myTimeCodes = itemsArray[i][0].split("-->");
        var myStart = parseTime(myTimeCodes[0])
        var myEnd = parseTime(myTimeCodes[1])

        // Join remaining lines with whitespace
        itemsArray[i].shift();
        var myText = itemsArray[i].join(" ");

        // Compile into an array
        var myData = [myStart, myEnd, myText]
        mySrt.push(myData);
    }
    return (mySrt)

}
// ——————————————————————————————————————————————————————————————————————
// Utililties
function parseTime(str) {
    hours = parseInt(str.split(':')[0]);
    minutes = parseInt(str.split(':')[1]);
    seconds = parseInt(str.split(':')[2]);
    //millisesconds = parseInt(str.split(':')[3]);
    millisesconds = parseInt(str.split(',')[1]);

    t = (hours * 60 * 60) + (minutes * 60) + seconds + (millisesconds / 1000);

    t = Math.round(t * 100) / 100;
    return t;
}

function createText(name, size, myText, start, end) {
    var myText = myComp.layers.addBoxText([size[0], size[1]], myText);
    var s = myText.sourceRectAtTime(0, 0)
    myText.SourceText = myText;
    myText.name = name;
    myText.inPoint = start;
    myText.outPoint = end;
    myText.property("Position").setValue(myCompSize);

    // center anchor point
    myText.property("Anchor Point").setValue([s.left + s.width / 2, s.top + s.height / 2])
}
// ——————————————————————————————————————————————————————————————————————
// var spreadsheet = openReadFile()
var spreadsheet = openReadFile("/Users/ddu/Desktop/ddu/projects/thinkmojo_invoca/DataCamp_L&D_SRT.txt")
var srt = parseSRTArray(spreadsheet)
for (i = 0; i < srt.length; i++) {
    createText(srt[i][2], [970, 900], srt[i][2], srt[i][0], srt[i][1]);
}