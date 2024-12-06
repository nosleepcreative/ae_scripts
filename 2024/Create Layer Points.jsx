/*
Script Name: Your Script Name
Description: 
- Created point nulls, with custom FFX applied, based on the bounding box of the selected layer
- Create 9 point null: corners and center of the edge


Author: Desmond Du
Website: duitbetter.com, https://github.com/nosleepcreative, https://www.youtube.com/@NoSleepCreative
Version: 1.0 
Date: [DATE], 2024
Copyright(c) 2024 nosleepcreative (Desmond Du). All rights reserved

Use Case:

Also see:

Change Log:

Future improvements:

*/

// basic setup
var comp = app.project.activeItem;
var mySelection = comp.selectedLayers[0];
var compWidth = comp.width;
var compHeight = comp.height;
var centerX = compWidth/2;
var centerY = compHeight/2;

app.beginUndoGroup("Undo")

// Cheatsheet

    // Selecting Color Properties
    comp.selectedProperties[0]("Color").value


