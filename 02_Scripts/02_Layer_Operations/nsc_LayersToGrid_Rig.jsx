/* nsc_LayersToGrid.jsx
Copyright(c) 2023 NoSleepCreative (Desmond Du). All rights reserved.
Website: duitbetter.com

Name: nsc_LayersToGrid
Version.1.01

Description:
This script tiles all layers in a composition into a grid. 
The number of columns can be changed in the Start Tile Null Layer.

Instructions:
Simply run the script on a composition with your layers, 
and it will inject the expressions into the position and scale parameters. 
Then go to the Effects panel of the first null layer, and change the slider value for Columns.

Also see:
- ASToolbox, James Zelasko
    One of ASToolbox tools
    https://github.com/Anti-Static/ASToolbox

- pt_ContactSheet, Paul Tuersley: 
    Dockable scriptUI, create contact sheet based on markers in active comp, also to be used with separate script pt_LayerMarkers.jsx.
    https://aescripts.com/pt_contactsheet/

- rd_CompSheet.jsx from rdscript_20170108 collection, Jeff Almasol (redefinery):
    Creates a contact sheet based on a layer named " style frames" with markers. It employs precomps for each frame.
     http://web.archive.org/web/20190305110031/http://redefinery.com/ae/scripts/rd_scripts_20170108.zip:
     
- Images Wall script, Motion Boutique


Change Log
v.1.01. Auto rename comp to "_CompSheet", create BG, added other similar scripts references
*/

app.beginUndoGroup("CompTiler");

myComp = app.project.activeItem;

// For Position expression:
var gridPos = '\ // variable setting \
var controlLayer = thisComp.layer("Start Tile");\
var numColumns = Math.floor(thisComp.layer("Start Tile").effect("Columns")("Slider").value);\
var myGutter = Math.floor(thisComp.layer("Start Tile").effect("Gutter")("Slider").value);\
\
// Grid Cell Indexing\
var tileIndex = index - controlLayer.index-1;\
var columnIndex = tileIndex%numColumns;\
var rowIndex = Math.floor(tileIndex/numColumns);\
var padding = myGutter*(numColumns+1);\
var columnWidth = (thisComp.width-padding)/numColumns;\
var firstTile = thisComp.layer(controlLayer.index+1);\
\
// Calculate position\
var rhRatio = firstTile.height/firstTile.width;\
var rowHeight = rhRatio*columnWidth;\
var xPos = columnWidth*(columnIndex+.5)+myGutter*(columnIndex+1);\
var yPos = rowHeight*(rowIndex+.5)+myGutter*(rowIndex+1);\
[xPos, yPos];\
    '
//For Scale expression:
var gridScale = '\ // variable setting\
var controlLayer = thisComp.layer("Start Tile");\
var numColumns = Math.floor(thisComp.layer("Start Tile").effect("Columns")("Slider").value);\
var myGutter = Math.floor(thisComp.layer("Start Tile").effect("Gutter")("Slider").value);\
\
// Calculate Scale\
var padding = myGutter*(numColumns+1);\
var columnWidth = (thisComp.width-padding)/numColumns;\
var firstTile = thisComp.layer(controlLayer.index+1);\
var xyScale = columnWidth/width*100;\
[xyScale, xyScale];\
';


// Select all layers and add expressions
for (var i = 1; i <= myComp.numLayers; i++) {
    myComp.layer(i).transform.position.expression = gridPos;
    myComp.layer(i).transform.scale.expression = gridScale;
}

// Create Start Tile null layer & Slider Effect
var myNull = myComp.layers.addNull();
myNull.name = "Start Tile";
myNull.guideLayer = true;
myNull.label = 14;
myNull.property("Marker").setValueAtTime(0, new MarkerValue("Change Grid Settings Here"));

// Create Column controls
var myColumns = myNull.property("Effects").addProperty("Slider Control");
myColumns.name = "Columns"
myColumns.property(1).setValue(3);

// Create Gutter Controls
var myGutter = myNull.property("Effects").addProperty("Slider Control");
myGutter.name = "Gutter"
//myGutter.property(1).setValue(10);

// Create End tile null layer
var myNull2 = myComp.layers.addNull();
myNull2.guideLayer = true;
myNull2.label = 14;
myNull2.name = "End Tile";
myNull2.moveToEnd();

// Organize Item
myComp.name = "_CompSheet"
myComp.label = 14;

// Create a new BG shape
var shapeLayer = myComp.layers.addShape();
shapeLayer.name = "BG";

var rectGroup = shapeLayer.property("Contents").addProperty("ADBE Vector Group");
var rectPath = rectGroup.property("Contents").addProperty("ADBE Vector Shape - Rect");
rectPath.property("Size").setValue([myComp.width, myComp.height]);
var fill = rectGroup.property("Contents").addProperty("ADBE Vector Graphic - Fill");
fill.property("Color").setValue([0, 0, 0]);  // RGB values for black
shapeLayer.moveToEnd();
