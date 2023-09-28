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

    // Look for specific headers and their column number
    for (i = 0; i < numColumn; i++) {
        if (headers[i] == "Comp Name") {
            compTextCol = i;
        }
        if (headers[i] == "STUDENT NAME") {
            srcTextCol1 = i;
        }
        if (headers[i] == "TITLE LINE 1") {
            srcTextCol2 = i;
        }
        if (headers[i] == "TITLE LINE 2") {
            srcTextCol3 = i;
        }
        if (headers[i] == "TITLE LINE 3") {
            srcTextCol4 = i;
        }
        if (headers[i] == "DESIGN") {
            srcTextCol5 = i;
        }
        
    }

    // split line into columns ("/\t/"); arrays of arrays (ignore header)
    for (var i = 0; i < itemsArray.length; i++) {
        itemsArray[i] = itemsArray[i].split(/\t/);
    }

    // version: duplicate, rename, change sourcetext
    for (i = 0; i < numColumn; i++) {
        for (var h in itemsArray) {
            // if name of layer not blank, duplicate
            if (itemsArray[h][i] != '') {
                var dupLayer = myLayer.duplicate();
                dupLayer.name = itemsArray[h][compTextCol];
                
                // Get and set the "Text Input" Essential Property
                var textInputProperty1 = dupLayer.property("Essential Properties").property("STUDENT NAME");
                var textInputProperty2 = dupLayer.property("Essential Properties").property("TITLE LINE 1");
                var textInputProperty3 = dupLayer.property("Essential Properties").property("TITLE LINE 2");
                var textInputProperty4 = dupLayer.property("Essential Properties").property("TITLE LINE 3");
                //var textInputProperty5 = dupLayer.property("Essential Properties").property("DESIGN");


                textInputProperty1.setValue(itemsArray[h][srcTextCol1]);
                textInputProperty2.setValue(itemsArray[h][srcTextCol2]);
                textInputProperty3.setValue(itemsArray[h][srcTextCol3]);
                textInputProperty4.setValue(itemsArray[h][srcTextCol4]);
               // textInputProperty5.setValue(itemsArray[h][srcTextCol5]);
                //dupLayer.sourceText.setValue(itemsArray[h][srcTextCol]);
                // precompose
                myComp.layers.precompose([dupLayer.index], dupLayer.name, true);
            }
        }
    }

} else {
    alert("Error opening file");
}


  