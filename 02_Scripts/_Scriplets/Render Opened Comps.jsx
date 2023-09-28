/* RenderAllOpenedComps.jsx
Copyright(c) 2019 nosleepcreative (Desmond Du). All rights reserved
Website: nosleepcreative.com

Name: RenderAllOpendComps
Version.1.0

Description:
This script sends all opened compoisitions in the project to the render queue, specify the render location.


*/
while (app.project.renderQueue.numItems > 0){
app.project.renderQueue.item(app.project.renderQueue.numItems).remove();
}

var myOpenComps = parseFloat(prompt("Please enter the number of opened compositions.\nPlease give an accurate amount or a value close to it.\nCreated by Desmond Du 19 August 2019"
));
app.beginUndoGroup("SelectAllOpenedComps")

// Reveal 1st composition panel
var inMenuID = -524342;
x
for(i=0; i<=myOpenComps;i++){
    var j = inMenuID-i;
    var myComp = app.project.activeItem; //
    var prevComp = app.project.activeItem.name; //  Previous composition name

    app.project.renderQueue.items.add(myComp); // Add to RQ
    app.executeCommand(j); // Go to next opened composition


}

/*
alert(app.project.renderQueue.numItems + " compositions has been added to the render Queue")

// menuID - 524342 open first comp



{
	// Change Render Locations.jsx
	//
	// This script prompts the user for a new output folder to use for queued items in the Render Queue.


}

alert("Please a render location")

function ChangeRenderLocations()
{
    var scriptName = "Change Render Locations";
    var newLocation = Folder.selectDialog("Select a render output folder...");

    if (newLocation != null) {
        app.beginUndoGroup(scriptName);

        // Process all render queue items whose status is set to Queued.
        for (i = 1; i <= app.project.renderQueue.numItems; ++i) {
            var curItem = app.project.renderQueue.item(i);

            if (curItem.status == RQItemStatus.QUEUED) {
                // Change all output modules for the current render queue item.
                for (j = 1; j <= curItem.numOutputModules; ++j) {
                    var curOM = curItem.outputModule(j);

                    var oldLocation = curOM.file;
                    curOM.file = new File(newLocation.toString() + "/" + oldLocation.name);

                }
            }
        }

        app.endUndoGroup();
    }
}
ChangeRenderLocations();
*/
