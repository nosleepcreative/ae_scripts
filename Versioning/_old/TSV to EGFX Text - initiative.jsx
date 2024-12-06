// selected layer essential properties source text replacement

var myComp = app.project.activeItem;
var myLayer = myComp.selectedLayers[0];

app.beginUndoGroup("dataMerger");

//var spreadsheet = File.openDialog("Please select .tsv file");
var spreadsheet = "C:\Users\Workstation\Downloads\super.tsv"

var readOK = spreadsheet.open("r");

if (readOK) {
    // parse tsv into arrays
    var spreadsheetContents = spreadsheet.read();
    var itemsArray = spreadsheetContents.split(/\n|\r/); // row arrays based on line breaks
    var itemsObject = new Object();


    // Find columns that has headers
    var headers = itemsArray[0].split(/\t/);
    var numColumn = headers.length;
    var srcTextCol = 0;

    for (i = 0; i < numColumn; i++) {
        if (headers[i] == "sourceText") {
            srcTextCol = i;
        }
    }

    for (var i = 0; i < itemsArray.length; i++) {
        itemsArray[i] = itemsArray[i].split(/\t/); // split line into columns ("/\t/"); arrays of arrays
    }



    for (i = 0; i < numColumn; i++) {
        for (var h in itemsArray) {
            // if name of layer not blank, duplicate
            if (itemsArray[h][i] != '') {
                var dupLayer = myLayer.duplicate();
                dupLayer.name = itemsArray[h][i];
                dupLayer.property("Essential Properties").property("Text Input").setValue(itemsArray[h][srcTextCol]);
            }
        }
    }

} else {
    alert("Error opening file");
}