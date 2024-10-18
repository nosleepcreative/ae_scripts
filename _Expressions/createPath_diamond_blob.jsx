var ctrl = thisLayer;
var myLength = ctrl.effect("width")("Slider")
var myHeight = ctrl.effect("height")("Slider")
var myPinch= ctrl.effect("pinch")("Slider")
var seed = 0

v1 = [-myLength/2, 0];
v2 = [0, -myHeight/2];
v3 = [myLength/2, 0];
v4 = [0, myHeight/2];
var inT = [
    [0, myPinch],
    [0, 0],
	[0, -myPinch],
    [0, 0],

];
var outT = [
    [0, myPinch],
    [0,0],
    [0, myPinch],
    [0,0],

]
vertices = [v1,v2,v3,v4];
createPath(vertices,inT,outT,1)
