// Setup
var proj = app.project;
var itemSel = proj.selection
// selection error prevention (if null or no comp item);
var selectionActive = 0;
if (itemSel[0] == null && !(itemSel[0] instanceof FolderItem)) {
    //
    alert("No items selected. Please select a composition item");

} else {
    // selected item within folder
    for (var i = 0; i < itemSel.length; i++) {
        var sel = itemSel[i];
        if (sel instanceof FolderItem) {
            for (var j = 1; j <= sel.items.length; j++) {
                itemSel.push(sel.item(j));
            }
        }
    }

    //
    for (var i = 0; i < itemSel.length; i++) {
        var sel = itemSel[i];
        myComps = [];
        if (sel instanceof CompItem) {
            myComps.push(sel);
        }
    }
    if (myComps[0] == null) {
        alert("No composition item seleceted. Please select a composition item")
    } else {
        alert("Comps found");
        selectionActive = 1;
    }
}



//main
app.beginUndoGroup("undo");
// select items, select comp items only

function resizeTo(item, SizeSel) {
    if (item instanceof CompItem) {

        // get item size
        var mySize = [item.width, item.height];

        // get longer size
        var longTall = item.width > item.height ? 0 : 1; // 0-long, 1-tall

        // presetted size
        var sizes = [
            [4, 3],
            [4, 5],
            [1, 1],
            [9, 16]
        ];

        var dup = item.duplicate();
        var x = sizes[SizeSel][0];
        var y = sizes[SizeSel][1];
        var reSizePx = longTall == 0 ? [item.width, item.width / x * y, ] : [item.height / y * x, item.height]

        // set value and name
        dup.width = Math.round(reSizePx[0]);
        dup.height = Math.round(reSizePx[1]);
        dup.name = item.name + "_" + sizes[SizeSel].join().replace(",", "X")
        return dup;
    }
}



if (selectionActive) {
    //create a new FolderItem in project
    var compFolder = app.project.items.addFolder("versions");
    for (i = 0; i < proj.selection.length; i++) {
        var dup = resizeTo(itemSel[i], 3);
        var dup = resizeTo(itemSel[i], 2);
        var dup = resizeTo(itemSel[i], 1);
        var dup = resizeTo(itemSel[i], 0);
        dup.parentFolder = compFolder;
    }
}