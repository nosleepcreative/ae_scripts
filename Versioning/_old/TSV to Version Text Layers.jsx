// Function: Duplicate a selected text layer, rename and change the sourcetext based on the first column of specified spreadsheet

var myComp = app.project.activeItem;
var myLayer = myComp.selectedLayers[0];

app.beginUndoGroup("dataMerger");

var spreadsheet = File.openDialog("Please select .tsv file");
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
        if (headers[i] == "STUDENT NAME") {
            srcTextCol = i;
        }
    }

    for (var i = 0; i < itemsArray.length; i++) {
        itemsArray[i] = itemsArray[i].split(/\t/); // split line into columns ("/\t/"); arrays of arrays
    }



    // check all columns for matching header with layer name
    // use only matched headers
    // duplicate the layer, rename, change source text

    // for (i = 0; i < numColumn; i++) {
    //     if (myLayer.name == itemsArray[i][0])
    //         for (var h in itemsArray) {
    //             // if name of layer not blank, duplicate
    //             if (itemsArray[h][i] != '') {
    //                 var dupLayer = myLayer.duplicate();
    //                 dupLayer.name = itemsArray[h][i];
    //                 dupLayer.sourceText.setValue(itemsArray[h][srcTextCol]);
    //             }
    //         }
    // }


    for (i = 0; i < numColumn; i++) {
        for (var h in itemsArray) {
            // if name of layer not blank, duplicate
            if (itemsArray[h][i] != '') {
                var dupLayer = myLayer.duplicate();
                dupLayer.name = itemsArray[h][i];
                dupLayer.sourceText.setValue(itemsArray[h][srcTextCol]);
            }
        }
    }

} else {
    alert("Error opening file");
}