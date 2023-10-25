/*
Script Name: Your Script Name
Description: 
- Briefly describe the primary function or purpose of your script.
- Mention any key features or tasks it performs.
- Provide context for its use and benefits.

Author: Desmond Du
Website: duitbetter.com, https://github.com/nosleepcreative, https://www.youtube.com/@NoSleepCreative
Version: 1.0 
Date: September 15, 2023
Copyright(c) 2023 nosleepcreative (Desmond Du). All rights reserved

Notes:
- You can add any additional notes, acknowledgments, or credits here.
- Mention if there are known issues or limitations.
- Provide contact information for support or feedback.
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