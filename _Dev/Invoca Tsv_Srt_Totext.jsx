var myComp = app.project.activeItem;
var myNumRows = itemsArray.length - 1;
var myCompSize = [myComp.width, myComp.height] / 2
// ——————————————————————————————————————————————————————————————————————

app.beginUndoGroup("dataMerger");

// Get and open txt file
// var spreadsheet = File.openDialog("Please select .tsv file");
var spreadsheet = File("/Users/ddu/Downloads/invoca_srt_parse - datacamp_L&D.tsv");
var readOK = spreadsheet.open("r");

if (readOK) {
    // parse tsv into arrays
    var spreadsheetContents = spreadsheet.read();
    var itemsArray = spreadsheetContents.split(/\n|\r/); // row arrays based on line breaks
    var itemsObject = new Object();

    // Find header columns
    var headers = itemsArray[0].split(/\t/);
    var numColumn = headers.length;
    var srcTextCol = 0;

    // split rows into columns ("/\t/"); arrays of arrays
    for (var i = 0; i < itemsArray.length; i++) {
        itemsArray[i] = itemsArray[i].split(/\t/);
    }

    for (i = 0; i < numColumn; i++) {
        if (headers[i] == "sourceText") {
            srcTextCol = i;
        }
    }
    // alert(itemsArray[1][0]) // row 2, col 1 -
    // alert(itemsArray[2][0]) // row 3, col 1 -
    // alert(itemsArray[1][1]) // row 2, col 2 -


} else {
    alert("Error opening file");
}


// ——————————————————————————————————————————————————————————————————————

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
    myText.SourceText = myText;
    myText.name = name;
    myText.inPoint = start;
    myText.outPoint = end;
    myText.property("Position").setValue(myCompSize);
}
// ——————————————————————————————————————————————————————————————————————

for (i = 1; i <= myNumRows; i++) {
    var myText = itemsArray[i][0]
    var startTime = parseTime(itemsArray[i][1]);
    var endTime = parseTime(itemsArray[i][2]);
    createText(myText, [970, 350], myText, startTime, endTime);
}