/*
Script Name: Switch Comp BG Color
Description: 
- Cycle through Composition BG Color: Whote, Grey, Black

Author: Desmond Du
Website: duitbetter.com, https://github.com/nosleepcreative, https://www.youtube.com/@NoSleepCreative
Version: 1.01 
Date: April, 2024
Copyright(c) 2024 nosleepcreative (Desmond Du). All rights reserved

Use Case:

Also see:

Change Log:
v. 1.01 Optimized with ChatGPT


Future improvements:
- add shift modifier
*/

var comp = app.project.activeItem;
var bgColor = comp.bgColor;

var colorCycle = [
    [0, 0, 0],    // Black
    [1, 1, 1],    // White
    [0.5, 0.5, 0.5] // Grey
];

function findColorIndex(color) {
    for (var i = 0; i < colorCycle.length; i++) {
        var match = true;
        for (var j = 0; j < color.length; j++) {
            if (color[j] !== colorCycle[i][j]) {
                match = false;
                break;
            }
        }
        if (match) return i;
    }
    return -1;
}

var currentIndex = findColorIndex(bgColor);
comp.bgColor = colorCycle[(currentIndex + 1) % colorCycle.length];
