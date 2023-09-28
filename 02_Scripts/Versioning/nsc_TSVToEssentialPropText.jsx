// 1. Ask user to locate a TSV file
var tsvFile = File.openDialog("Select the TSV file.");

// or specify file
//var tsvFile = "..."

if (!tsvFile) {
  alert("No file selected. Script execution aborted.");
}

// 2. Duplicate active composition and rename based on the TSV column "Name"
var compToDuplicate = app.project.activeItem;
if (!(compToDuplicate instanceof CompItem)) {
  alert("No composition selected. Script execution aborted.");
}

var tsvData = readTSVFile(tsvFile);
if (!tsvData) {
  alert("Error reading TSV file. Script execution aborted.");
}
/////////
var nameColumnIndex = 1; // Assuming "Name" column is the first column
for (var i = 0; i < tsvData.length; i++) {
  var compName = tsvData[i][nameColumnIndex];
  var textValue = tsvData[i][textColumnIndex];

  var duplicatedComp = compToDuplicate.duplicate();
  duplicatedComp.name = compName;
// Modify the layer "super" sourcetext value to the TSV column "Text"
  textInputProperty = duplicatedComp.layer("super").property("Essential Properties").property("Text Input");
  // Set the value of the "Text Input" property
    textInputProperty.setValue(value);

}



alert("Script execution completed successfully.");
