app.beginUndoGroup("DataMerger_L3") ;

var spreadsheet = File.openDialog("Please select .txt file (tab-delimited)");

var readOK = spreadsheet.open("r");

if (readOK) {

	var spreadsheetContents = spreadsheet.read();
	var itemsArray = spreadsheetContents.split(/\n|\r/); //creates an array based on line feed
	var itemsObject = new Object();
	for (var i=0; i < itemsArray.length; i++) {
		itemsArray[i]= itemsArray[i].split(/\t/); //creates an array based on commas ("/") or tabs ("/\t/")
		itemsObject["Data"+i] = { // storing column data into objects
			data1: itemsArray[i][0],
			data2: itemsArray[i][1],
			data3: itemsArray[i][2]
			}
		}

	var foundTemplate = false;
	for (var j=1; j <= app.project.numItems; j++) {
		if ( app.project.item(j).name.match(/_Template$/) ) {
			var templateComp = app.project.item(j);
			if (templateComp instanceof CompItem) {
				foundTemplate = true;
				} else {
					alert("Found template but it's NOT a comp!");
					}
			} //if (app.project.item(j).name == "Tag_Template")
		} // for  j loop

		if (foundTemplate) {
		for (var h in itemsObject) {
				var dupComp = templateComp.duplicate();
				dupComp.name = templateComp.name.replace(/_Template$/,"- "+itemsObject[h].data1);
				for (k=1; k <= dupComp.numLayers; k++) {
					if (dupComp.layer(k).sourceText != undefined) {
						if (dupComp.layer(k).sourceText.value == "DATA1") {
						dupComp.layer(k).sourceText.setValue(itemsObject[h].data1);
						} //	if (dupComp.layer(k).sourceText.value == "STATION NAME")
						if (dupComp.layer(k).sourceText.value == "DATA2") {
						dupComp.layer(k).sourceText.setValue(itemsObject[h].data2);
							} //if (dupComp.layer(k).sourceText.value == "TIME")
                        if (dupComp.layer(k).sourceText.value == "DATA3") {
						dupComp.layer(k).sourceText.setValue(itemsObject[h].data3);
							} //if (dupComp.layer(k).sourceText.value == "TIME")
					} //if (dupComp.layer(k).sourceText != undefined)

				} //for (k=1; k <= dupComp.numLayers; k++)

			}// for (var h=0 in itemsObject)
		} else {//if (foundTemplate)
			alert("Could not find template");
			}

	} else {
		alert("Error opening file");
		}

// splice odd number 1,3,5 / 0,2,4,6  increment by 2
// workaround excel unicode
// Do not use commas in rows
// Use tab-delimited
