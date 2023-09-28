// try looking for a solid named bg, if not create a new black one
var myComp = app.project.activeItem;
var comp_bg = myComp.bgColor;

var exists = 0;
var n = 0;
var c = 0;
var solidLayer;

var baseColor = [0, 0, 0];
var col_1 = [1, 1, 1];
var col_2 = [.5, .5, .5];

var bg;

// find solid bg layer number
for (i = 1; i <= myComp.numLayers; i++) {
    if (myComp.layer(i).name == "bg") {
        exists = 1
        n = i;
        break;
    }
}

//  create or change solid color
if (exists) {
    solidLayer = myComp.layer(n);
    bg = solidLayer.source.mainSource.color;

    if (bg[0] == 0 && bg[1] == 0 && bg[2] == 0) {
        c = 1
    } // black to white
    if (bg[0] == 1 && bg[1] == 1 && bg[2] == 1) {
        c = 2
    } // white to grey
    if (bg[0] == .5 && bg[1] == .5 && bg[2] == .5) {
        c = 3
    } // grey to black

    switch (c) {
        case 0:
            solidLayer.source.mainSource.color = baseColor;
            break;

        case 1:
            solidLayer.source.mainSource.color = col_1
            break;

        case 2:
            solidLayer.source.mainSource.color = col_2
            break;

        case 3:
            solidLayer.source.mainSource.color = baseColor;
            break;
    }
} else {
    mySolid = myComp.layers.addSolid(comp_bg, "bg", myComp.width, myComp.height, 1);
}


// if black one exist check color to white
//
//
// )

// {
//
// 	if (activeItem == null || !(activeItem instanceof CompItem)) {
// 		alert("Select a comp before running this script");
// 	} else {
// 		if (activeItem.selectedLayers.length < 1) {
// 			alert("Select a solid layer before running this script");
// 		} else {
// 			solidLayer = activeItem.selectedLayers[0];
// 			solidLayer.source.mainSource.color = [1,1,1];
// 			alert("Changed solid's color to white.");
// 		}
// 	}
// }
