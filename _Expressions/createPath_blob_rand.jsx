var ctrl = thisLayer;
var myLength = ctrl.effect("width")("Slider")
var myHeight = ctrl.effect("height")("Slider")
var seed = 20
var tangentWidthRange = effect("tangent")("Point")[0]
var tangentHeightRange = effect("tangent")("Point")[1]
var offset = [-200,200];
seedRandom(seed, true);
vertices = [
    [-myLength / 2 , random(offset[0],offset[1])],
    [random(offset[0],offset[1]), -myHeight / 2],
    [myLength / 2, random(offset[0],offset[1])],
    [random(offset[0],offset[1]), myHeight / 2]
]
tangentWidth_1 = random(tangentWidthRange)
tangentWidth_2 = random(tangentWidthRange)


tangentHeight_1 = random(tangentHeightRange)
tangentHeight_2 = random(tangentHeightRange)

var inT = [
    [0, tangentHeight_1],
    [-tangentWidth_1, 0],
	[0, -tangentHeight_1],
    [tangentWidth_1, 0],

];
var outT = [
    [0, -tangentHeight_1],
    [tangentWidth_1,0],
    [0, tangentHeight_1],
    [-tangentWidth_1,0],

]

createPath(vertices, inT, outT, 1);
