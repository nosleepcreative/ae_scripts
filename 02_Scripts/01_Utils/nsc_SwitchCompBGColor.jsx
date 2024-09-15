/*
Script Name: nsc_SwitchCompBGColor
Description: 
- Cycle through Composition BG Color: Whote, Grey, Black

Author: Desmond Du
Website: duitbetter.com, https://github.com/nosleepcreative, https://www.youtube.com/@NoSleepCreative
Version: 1.0 
Date: April, 2024
Copyright(c) 2024 nosleepcreative (Desmond Du). All rights reserved

Use Case:

Also see:

Change Log:

Future improvements:
- add shift modifier
*/

myComp = app.project.activeItem
var bg = myComp.bgColor;
var n = 0;

var baseColor = [0, 0, 0]; // black
var col_1 = [1, 1, 1]; // white
var col_2 = [.5, .5, .5]; // white
var col_r = [1,0,0]; // red
var col_g = [0,1,0]; // green
var col_b= [0,0,1]; // white


if (bg[0] == 0 && bg[1] == 0 && bg[2] == 0) {
    n = 1
} // black to white
if (bg[0] == 1 && bg[1] == 1 && bg[2] == 1) {
    n = 2
} // white to grey
if (bg[0] == .5 && bg[1] == .5 && bg[2] == .5) {
    n = 3
} // grey to black


switch (n) {
    case 0:
        app.project.activeItem.bgColor = baseColor;
        break;

    case 1:
        app.project.activeItem.bgColor = col_1;
        break;

    case 2:
        app.project.activeItem.bgColor = col_2;
        break;

    case 3:
        app.project.activeItem.bgColor = baseColor;
        break;
}
