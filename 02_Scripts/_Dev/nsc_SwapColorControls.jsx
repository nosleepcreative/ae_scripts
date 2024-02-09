/*
Script Name: nsc_SwapColorControls
Description: 
This script takes two selected color properties and transfers its value to individual Color Control Effects
in a newly created Null layer and they are linked together with expressions. 
Addtionally, there is a checkbox control to swap the colors

Author: Desmond Du
Website: duitbetter.com, https://github.com/nosleepcreative, https://www.youtube.com/@NoSleepCreative
Version: 1.0
Date: October 11, 2023
Copyright (c) 2023 nosleepcreative (Desmond Du). All rights reserved
*/


var comp = app.project.activeItem;
var mySelection = comp.selectedLayers;
var compWidth = comp.width;
var compHeight = comp.height;
var centerX = compWidth/2;
var centerY = compHeight/2;
app.beginUndoGroup("Undo")

// Select color controls
var myColor1 = comp.selectedProperties[0].value;
var myColor2 = comp.selectedProperties[2].value;


// Create a new null layer
var newNullLayer = app.project.activeItem.layers.addNull();
newNullLayer.name = "Swap Control Null";

// Add a checkbox expression control to the null layer
var checkboxControl = newNullLayer.Effects.addProperty("ADBE Checkbox Control");
checkboxControl.name = "Swap Properties";

// Create color controls
var colorEffect1 = newNullLayer.Effects.addProperty("ADBE Color Control");
colorEffect1.name = "Color 1"
var colorEffect2 = newNullLayer.Effects.addProperty("ADBE Color Control");
colorEffect2.name = "Color 2"


// Copy value to color controls
colorEffect1("Color").setValue(myColor1);
colorEffect2("Color").setValue(myColor2);

// Link the color property to the color controls effect
var expressionString1 = 'thisComp.layer("Swap Control Null").effect(Color 1)("Color");';
var expressionString2 = 'thisComp.layer("Swap Control Null").effect(Color 2)("Color");';
myColor1.property("Color").expression = expressionString1;
myColor2.property("Color").expression = expressionString2;

// Create an expression on the first selected property
var prop1 = app.project.activeItem.selectedProperties[0];
var expression1 = "if (thisComp.layer(\"Swap Control Null\").effect(\"Swap Properties\")(\"Checkbox\") == 0) { effect(Color 2)(\"Color\" } else { value }";
prop1.expression = expression1;

// Create an expression on the second selected property
var prop2 = app.project.activeItem.selectedProperties[1];
var expression1 = "if (thisComp.layer(\"Swap Control Null\").effect(\"Swap Properties\")(\"Checkbox\") == 0) { effect(Color 1)(\"Color\" } else { value }";
prop2.expression = expression2;

