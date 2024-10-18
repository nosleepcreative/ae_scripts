// Prompt the user to enter a name and number index suffix
var name = prompt("Enter a name:", "");
var indexSuffix = prompt("Enter a number index to start at:", "");
app.beginUndoGroup("undo");

// Get the selected compositions
var selectedComps = app.project.selection;
if (selectedComps.length > 0) {
  // Loop through the selected compositions and apply the name with index suffix
  for (var i = 0; i < selectedComps.length; i++) {
    var comp = selectedComps[i];
    // Create the new name with index suffix
    var newName = name + "_" + (i + parseInt(indexSuffix)); 
    // Set the new name for the composition
    comp.name = newName;
  }
  alert("Selected compositions have been renamed successfully!");
} else {
  alert("No compositions are selected.");
}
