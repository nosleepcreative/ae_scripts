var myComp = app.project.activeItem;

app.beginUndoGroup("dataMerger");
var spreadsheet = "/Users/ddu/Desktop/ddu/projects/CM23_2022_11_02/Attendees - Title Credits.tsv"
//var spreadsheet = File.openDialog("Please select .tsv file");


function DuplicateTextLayersWithTSVData(filePath) {
    // Import the TSV file
    var file = new File(filePath);
    var contents = file.open("r");
    contents = file.read();
    file.close();

    // Split the contents into rows
    var rows = contents.split("\n");

    // Initialize an empty array for cells
    var cells = [];

    // Split the rows into cells
    for (var i = 0; i < rows.length; i++) {
        cells.push(rows[i].split("\t"));
    }

    // Get the headers from the first row
    var headers = cells[0];

    var srcTextCol;
    // check if the header "sourceText" exists and store the index
    for (var j = 0; j < headers.length; j++) {
        if (headers[j] === "sourceText") {
            srcTextCol = j;
            break;
        }
    }

    // Get the active composition
    var activeComp = app.project.activeItem;

    // Iterate through the layers in the active composition
    for (var i = 1; i <= activeComp.numLayers; i++) {
        var item = activeComp.layer(i);

        // Check if the layer is a text layer
        if (item instanceof TextLayer) {
            var foundMatch = false;

            // Iterate through the headers
            for (var j = 0; j < headers.length; j++) {
                if (headers[j] === item.name && cells[i][j] != "") {
                    foundMatch = true;
                    var dupLayer = item.duplicate();

                    dupLayer.name = cells[i][j];
                    dupLayer.sourceText.setValue(cells[i][srcTextCol]);
                    break;
                }
            }
        }
    }
}


DuplicateTextLayersWithTSVData(spreadsheet)