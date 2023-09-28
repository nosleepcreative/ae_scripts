/* HexTiler.jsx
Copyright(c) 2019 nosleepcreative (Desmond Du). All rights reserved
Website: nosleepcreative.com

Name: HexTiler
Version.1.0

Description:
This script tiles a selected layer (hexagon precomp prefered) hexagonal tessellation with the ability to control zPos displacement and its seed across all tiles The ratio of the Tile precomp should have a ratio of 1:1.1547005
*/


app.beginUndoGroup("CompTiler");
myComp = app.project.activeItem;

// For Position expression:
var gridPos = '// Setup \
    var controlLayer = thisComp.layer("Start Tile");\
    var numColumns = Math.floor(thisComp.layer("Start Tile").effect("Columns")("Slider").value);\
    var Mmargins = Math.floor(thisComp.layer("Start Tile").effect("Margins")("Slider").value);\
    var myWidthRatio = thisComp.layer("Start Tile").effect("Height Adjustment")("Slider");\
    var myZPos = thisComp.layer("Start Tile").effect("Z-Pos Adjustment")("Slider");\
    var mySeed = thisComp.layer("Start Tile").effect("Seed")("Slider");\
    \
// Indexing \
    var tileIndex = index - controlLayer.index-1;\
    var columnIndex = tileIndex%numColumns;\
    var rowIndex = Math.floor(tileIndex/numColumns);\
    if (rowIndex % 2 == 0) {var oddEven = 1;}else{oddEven=0;}\
    \
// Z-Positioning \
    seedRandom(index+mySeed, true);\
    var zPos = random(-myZPos,myZPos);\
    \
// Positioning \
    var columnWidth = thisComp.width/numColumns ;\
    var firstTile = thisComp.layer(controlLayer.index+1);\
    var rowHeight = firstTile.height/firstTile.width*columnWidth;\
    var xPos = columnWidth*(columnIndex+.5);\
    var yPos = rowHeight*(rowIndex+.5);\
    [xPos +oddEven*columnWidth/2, yPos*myWidthRatio,zPos];\
'


//For Scale expression:
var gridScale = '// Setup \
    var controlLayer = thisComp.layer("Start Tile");\
    var numColumns = Math.floor(thisComp.layer("Start Tile").effect("Columns")("Slider").value);\
    var myScaleRatio = thisComp.layer("Start Tile").effect("Scale Adjustment")("Slider");\
    \
    // Indexing \
    var columnWidth = thisComp.width/numColumns ;\
    var firstTile = thisComp.layer(controlLayer.index+1);\
    var rowHeight = firstTile.width/firstTile.height*columnWidth;\
    \
    //Scaling \
    var xyScale = columnWidth/width*100;\
    [xyScale, xyScale]*myScaleRatio;\
';


// Select all layers and add expressions
for(var i = 1; i <= myComp.numLayers; i++){
    myComp.layer(i).transform.position.expression = gridPos;
    myComp.layer(i).transform.scale.expression = gridScale;
}


// Create Start Tile null layer & Slider Effect
var myNull= myComp.layers.addNull();
myNull.name= "Start Tile";

var myColumns = myNull.property("Effects").addProperty("Slider Control");
myColumns.name = "Columns"
myColumns.property(1).setValue(5);

var myMargins = myNull.property("Effects").addProperty("Slider Control");
myMargins.name = "Margins"

var myHeightAdj = myNull.property("Effects").addProperty("Slider Control");
myHeightAdj.name = "Height Adjustment";
myHeightAdj.property(1).setValue(.75);

var myScaleAdj = myNull.property("Effects").addProperty("Slider Control");
myScaleAdj.name = "Scale Adjustment";
myScaleAdj.property(1).setValue(1.00);

var myZPosAdj = myNull.property("Effects").addProperty("Slider Control");
myZPosAdj.name = "Z-Pos Adjustment";

var mySeed = myNull.property("Effects").addProperty("Slider Control");
mySeed.name = "Seed";
mySeed.property(1).setValue(1.00);

// Create End tile null layer
var myNull2= myComp.layers.addNull();
myNull2.name= "End Tile";
myNull2.moveToEnd();
