/*
 nsc_normalizeLogos.jsx
 Copyright (c) 2020 NoSleepCreative (Desmond Du). All rights reserved.
 check it: www.nosleepcreative.com

 Name: rd_SnapDecisions
 Version: 1.2

 Functionalities:
 - Applies a sample expression to the selected layers,
 - harvest the result,
 - and then remove the expression.

 Functionalities
 - This script canused as a dockable panel by placing the  script in a ScriptUI Panels subfolder of the Scripts folder, and then choosing this script from the Window menu.

 Notes:

 Prerequisites:
 requires After Effects CS5 or later.


 Legal:
 This script is provided "as is," without warranty of any kind, expressed
 or implied. In no event shall the author be held liable for any damages
 arising in any way from the use of this script.

 In other words, I'm just trying to share knowledge with and help out my
 fellow AE script heads, so don't blame me if my code doesn't rate. :-)

 How it works:
 select layers
 for loop function that find nominal scale factor (%)
 set scale to that norm


*/


app.beginUndoGroup("normalizeLogos") ;
// shorthands;
var proj = app.project;
var comp = proj.activeItem;
var selectedLayers = comp.selectedLayers;

// variables
var nominalWidth = 900;
var myProperty;

//expressions
var exp = '//nominalValues\
n1 = 960; //squareWidth\
n2 = 1735; // long \
n3 = 1200;//tall\
leftEdge = 0;\
for (i = 0; i <= width; i++){\
    temp = sampleImage([i,height/2],[0.5,height/2],true);\
    if (temp[3] > 0){\
        leftEdge = i; break;}\
    }rightEdge = width-1;\
for (i = width-1; i >= 0; i--){\
  temp = sampleImage([i,height/2],[0.5,height/2],true);\
  if (temp[3] > 0){\
    rightEdge = i;\
    break;\
    }\
}\
topEdge = 0;\
for (i = 0; i <= height; i++){\
  temp = sampleImage([width/2,i],[width/2,0.5],true,time);\
  if (temp[3] > 0){\
    topEdge = i;\
    break;\
    }\
}\
bottomEdge = height-1;\
for (i = height-1; i >= 0; i--){\
  temp = sampleImage([width/2,i],[width/2,0.5],true,time);\
  if (temp[3] > 0){\
    bottomEdge = i;\
    break;\
    }\
}\
alphawidth = rightEdge-leftEdge+1;\
alphaheight =bottomEdge-topEdge+1; // in pixels \
alphaRatio = alphawidth/alphaheight;\
if(alphaRatio<1.5){value*n1/alphawidth};\
if(alphaRatio>1.5){value*n2/alphawidth};\
if(alphaRatio<.85){value*n3/alphaheight};\
// cacheCompareSamplesPerSecond 0';

var nExp = //'data = thisComp.layer("userControl'); var n1 = 940; value/2/940*nominalWidth'


function convertToKeyframes(theProperty){
    if (theProperty.canSetExpression && theProperty.expressionEnabled){
        theProperty.selected = true;
        app.executeCommand(app.findMenuCommandId("Convert Expression to Keyframes"));
        theProperty.selected = false;
    }
}// source:https://forums.creativecow.net/docs/forums/post.php?forumid=227&postid=13039&univpostid=13039&pview=t


// Get the list of selected layer
for (var i=0; i<selectedLayers.length; i++) {
    myScale = selectedLayers[i].transform.scale;
    selectedLayers[i].transform.scale.setValue([100,100]);
    myScale.expression = exp;
    myProperty = selectedLayers[i].property("scale");
    myProperty.selected = true;
    app.executeCommand(app.findMenuCommandId("Convert Expression to Keyframes"));
    //convertToKeyframes(myProperty);
    myScale.removeKey(1);
    myScale.expression = ''; // normalized exp
    }
