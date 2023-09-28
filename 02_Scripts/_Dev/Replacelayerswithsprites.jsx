// nsc_replaceLayersWithSprites

function getFolder(folderName) {
    for (var i = 1; i <= app.project.numItems; i++) {
        if ((app.project.item(i) instanceof FolderItem) && (app.project.item(i).name == folderName)) {
            return app.project.item(i);
        }
    }
    return null;
}

https://creativecow.net/forums/thread/replacing-layers-with-comps-script/

function main(folderName) {
    var myComp = app.project.activeItem;
    var myLayers = myComp.selectedLayers;

    // try finding a folder named sprites, else alert please create folder named "sprites" and have item in it
    var myFolder = getFolder(folderName);
    if (myComp == null) {
        alert("Can't find folder'" + name + "'");
        return;
    }
    // if there is no item in sprites, alert ""

    // replace selected layers in active comp
    for (var i = 0; i <= myLayers.length; i++) {
        mySprite =
        myLayers.replaceSource(mySprite, false);
    }
}

main("sprites");
