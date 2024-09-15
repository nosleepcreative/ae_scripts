//Rect Mask v1.0

// Get current mask's name, initialize the effect variable
var maskName = thisProperty.propertyGroup(1).name;
var fx = effect(maskName.split('<')[1].split('>')[0]) || effect("Rect Mask");


//Get parameters
pct = Math.max(0, fx("Completion (%)") / 100);
rw = fx("Width")/ 2 * pct;
rh = fx("Height")/ 2 * pct;
rot = fx("Rotation") * Math.PI / 180; // Convert to radians
cb = fx("Circle Mask");
var maskPosOffset = [fx("Offset X"),fx("Offset Y");]

// Adjustments
if (cb==1) rh = rw; // Circule Mask Checkbox
t = [rw, rh] * 0.5523; // Ellipse parameters

// Center position
var isShapeLayer = thisLayer.content == "Contents"; // // Determine if the layer is a shape layer
var center = isShapeLayer ? maskPosOffset : [thisLayer.width / 2 + maskPosOffset[0], thisLayer.height / 2 + maskPosOffset[1]];

// Function to rotate a point around a specific center
function rotatePoint(point, center, angle) {
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    var translatedX = point[0] - center[0];
    var translatedY = point[1] - center[1];
    var rotatedX = translatedX * cos - translatedY * sin;
    var rotatedY = translatedX * sin + translatedY * cos;
    return [rotatedX + center[0], rotatedY + center[1]];
}

// Function to rotate a tangent
function rotateTangent(tangent, angle) {
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    var rotatedX = tangent[0] * cos - tangent[1] * sin;
    var rotatedY = tangent[0] * sin + tangent[1] * cos;
    return [rotatedX, rotatedY];
}

// Define vertices and tangents
vertices = [[cx, cy - rh], [cx + rw, cy], [cx, cy + rh], [cx - rw, cy]];
inTangents = [[-t[0], 0], [0, -t[1]], [t[0], 0], [0, t[1]]];
outTangents = [[t[0], 0], [0, t[1]], [-t[0], 0], [0, -t[1]]];

// Rotate vertices and tangents
rotatedVertices = vertices.map(function(v) {
    return rotatePoint(v, [cx, cy], rot);
});
rotatedInTangents = inTangents.map(function(t) {
    return rotateTangent(t, rot);
});
rotatedOutTangents = outTangents.map(function(t) {
    return rotateTangent(t, rot);
});

closed = true;

// Create the path
createPath(rotatedVertices, rotatedInTangents, rotatedOutTangents, closed);


