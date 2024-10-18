// Get the path from the Shape layer's Path 1 property
var path = content("Shape 1").content("Path 1").path;

// Define variables for the path length calculation
var length = 0;
var steps = 100;
var p0 = path.pointOnPath(0);

// Loop through the path and calculate the length
for (i = 1; i <= steps; i++ ) {
  var p1 = path.pointOnPath(i/steps);
  length += length(p0, p1);
  p0 = p1;
}

// Return the total length of the path
length;

// source: https://creativecow.net/forums/thread/getting-the-length-of-a-mask-or-shape-path/