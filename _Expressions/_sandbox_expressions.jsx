// ——————————————————————————————————————————————————————————————————————
// Loop Out Source Text
if (numKeys >1 && time > key(numKeys).time){
t1 = key(1).time;
t2 = key(numKeys).time;
span = t2 - t1;
delta = time - t2;
t = delta%span;
valueAtTime(t1 + t)
}else
value

// ——————————————————————————————————————————————————————————————————————

ctrl = thisComp.layer("control");
myIndex = index - ctrl.index;
t = time + ctrl.effect("delay")("Slider") * myIndex;
// ——————————————————————————————————————————————————————————————————————

c = thisComp.layer(myIndex).transform.position.valueAtTime(t);
pct = effect("interpolate")("Slider")
linear(pct, 0, 100, c, value)
pos + [thisComp.width, thisComp.height] / 2;
seedRandom(thisComp.layer("startDot").effect("seed")("Slider"), 1);
t = random(thisComp.layer("startDot").effect("frameDelay")("Slider")) * thisComp.frameDuration;
x = thisComp.layer("startDot").effect("scaleCompletion")("Slider").valueAtTime(time - t);
s = linear(x, 0, 100, 0, value);


// ——————————————————————————————————————————————————————————————————————
// Interpolate current position to nearest ring
// user variables
var completion = 50; // completion
var baseDiameter = 300;
var diameterInc = 200;
var numRings = 5;
var layerSize = 50;
// declaration
var arr, pos, ringPoints = [];
var myRadius, myPhase, dist;

// create all the ring radii
for (i = 0; i < numRings; i++) {
    var r = arr.push(baseDiameter + i * diameterInc);
    var c = 2 * Math.PI * x / 2;
    ringPoints.push(Math.ceil(c / (layerSize + pad)));

}


// calculate nearest ring radius
dist = length(toWorld(transform.anchorPoint), [thisComp.width, thisComp.height] / 2);
for (i = 0; i < arr.length; i++) {
    seg = inc / 2;
    if ((dist <= arr[i] && (arr[i] - dist) <= seg) || (dist >= arr[i] && (dist - arr[i]) <= seg) {
            myRadius = arr[i];
            break;
        }
    }
}

// calculate phase

myPhase = radiansToDegrees(Math.atan2(value[1], value[0])]


// calculate position
pos = myRadius * [Math.cos(myPhase), Math.sin(myPhase)];
linear(completion, 0, 100, value, pos);

// ——————————————————————————————————————————————————————————————————————

// clock I
function clockTime(tick, startHour, startMinute, delimiter, endString) {
    //calculate hour & minute time
    var myMinutes = Math.floor(startMinute + tick) % 60
    var hourChange = (time * tick - myMinutes) / 60
    var myHour = (startHour + Math.floor(hourChange)) % 12

    // add zeroes
    if (myMinutes <= 9) myMinutes = "0" + myMinutes.toString();
    if (myHour <= 9) myHour = "0" + myHour.toString();

    //concatenate
    return myHour.toString() + delimiter.toString() + myMinutes.toString() + endString;
}
// usage
clockTime(time * 200, 6, 53, ":", "")
// ——————————————————————————————————————————————————————————————————————



//  attach to a random layer's position
seed = thisComp.layer("startDot").effect("seed")("Slider");
seedRandom(seed, 1);
var n = Math.ceil(random(thisComp.layer("startDot").index, thisComp.layer("endDot").index - 1));
thisComp.layer(n).transform.position

// Fill — turn on right one frame before outPoint
time == outPoint - framesToTime(1) ? 100 : 0
// ——————————————————————————————————————————————————————————————————————


function offsetValueAtTime(props, delay, indexOrRand, seed) {
    seedRandom(seed, 1)
    var myIndex = index - ctrl.index;
    var offset = myIndex * framesToTime(delay);
    indexOrRand == 0 ? offset = random(framesToTime(delay)) : offset;
    return props.valueAtTime(time - offset);
}
// usage
var zOffset = offsetValue(value[2], 10, 1, 10)
value += [0, 0, zOffset];
// ——————————————————————————————————————————————————————————————————————
// calculate the offset weightage
// distance based + randomness + art direction manual control for pockets
//
//


pos += [thisComp.width, thisComp.height] / 2
// select by distance scriptlet

function selByDist(layers, dist) {
    myPos = toWorld.(transform.anchorPoint)
    x = Math.abs(thisComp.width / 2 - myPos[0]);
    y = Math.abs(thisComp.height / 2 - myPos[1]);
    var sel = [];
    for (var i = 0; i < layers.length; i++) {
        if (x > dist[0] && y > dist[0] || ) {
            sel.push(layers[i]);
        }
        return sel;
    }

    sel(myLayers, [500, 500])

}
// ——————————————————————————————————————————————————————————————————————
function tileLayer(ctrlLayer, columns, margin, padX, padY) {
    // variables
    var numColumns = Math.floor(columns);
    var myMargin = Math.floor(margin) / 2;
    var padding = Math.floor([padX, padY]);

    // get absolute, column, & row index
    var tileIndex = index - ctrlLayer.index - 1;
    var columnIndex = tileIndex % numColumns;
    var rowIndex = Math.floor(tileIndex / numColumns);
    var firstTile = ctrlLayer.index + 1;

    // calculate dimensions
    var columnWidth = (thisComp.width - myGutter - numColumns * padding[0]) / numColumns;
    var rowHeight = (firstTile.height) / firstTile.width * (columnWidth) + myGutter / 2;

    // calculate position
    var xPos = myMargin + columnWidth * (columnIndex + .5)
    columnIndex != 0 ? xPos += padding[0] : xPos; // add padding to non-first columns
    var yPos = myMargin + rowHeight * (rowIndex + .5)

    return [xPos, yPos];
}
// usage for position
tileLayer(, 5, 20, 0, 0)
// ——————————————————————————————————————————————————————————————————————




//For Scale expression:
var gridScale = '\
    var controlLayer = ctrlLayer;\
    var numColumns = Math.floor(ctrlLayer.effect("Columns")("Slider").value);\
    var myGutter = Math.floor(ctrlLayer.effect("Gutter")("Slider").value);\
    var columnWidth = thisComp.width/numColumns -myGutter;\
    var firstTile = thisComp.layer(controlLayer.index+1);\
    var rowHeight = firstTile.width/firstTile.height*columnWidth;\
    var xyScale = columnWidth/width*100;\
    [xyScale, xyScale];\
';