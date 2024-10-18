//User Variables
var ctrl = thisLayer;
var seed = ctrl.effect("seed")("Slider");
var sym = effect("symmetrical")("Checkbox");

// var stem = ctrl.effect("length")("Slider");
var xRange = effect("xRange")("Point");
var yRange = effect("yRange")("Point");

var base = effect("base")("Slider");
var spacing = effect("spacing")("Slider");

var startTime = 1;
var delay = 10 * thisComp.frameDuration;

var sides;
sym == 1 ? sides = 2 : sides = 1;

// Get propertyIndex
var myIndex = thisProperty.propertyGroup(3).propertyIndex - 2;
var dir = myIndex % 2 // yields 1 - left, 0 - Right
var rowIndex = Math.floor(myIndex / sides) 
var inc = base + effect("spacing")("Slider") * rowIndex;

// Begin expression
seedRandom(seed, true);
var fork_x = random(xRange[0], xRange[1]) //*(-rowIndex/10+1) // rand x gets smaller as rows increase
dir == 1 ? fork_x *= -1 : fork_x *= 1; // switch direction based on index

var rand_y = random(yRange[0], yRange[1]);
fork_y = inc + rand_y;
grow = ease(time, startTime, startTime + delay * myIndex, [0,-inc], [fork_x,-fork_y]) // animation


// execute
arr = [[0, 0],[0, - inc],grow];

createPath(arr, [], [], 0)
