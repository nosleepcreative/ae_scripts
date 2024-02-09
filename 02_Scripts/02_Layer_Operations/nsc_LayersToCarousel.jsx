/*
Script Name: Your Script Name
Description: 
This is a script for After Effects that allows you to build a working Carousel with one click. 
There are 5 types of Carousel: Linear, Circular 2D, Circular 3D, Exponential and Path.

- Briefly describe the primary function or purpose of your script.
- Mention any key features or tasks it performs.
- Provide context for its use and benefits.

Author: Desmond Du
Website: duitbetter.com, https://github.com/nosleepcreative, https://www.youtube.com/@NoSleepCreative
Version: 1.0 
Date: [DATE], 2023
Copyright(c) 2023 nosleepcreative (Desmond Du). All rights reserved

Use Case:

Also see:
https://aescripts.com/carousel-xpress/

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


// vertical carousel: selected layer attached to a newly created null "#LTC-(001)-Controller", 
// add in preset to selected laye and controller
// controls: spacing
// mode: vertical, horizontal 3D