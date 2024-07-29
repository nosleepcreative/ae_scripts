// v1.3

// Get the current mask's name
var maskName = thisProperty.propertyGroup(1).name;

// Initialize the effect variable
var fx = effect(maskName.split('<')[1].split('>')[0]) || effect("Rect Mask");

// Retrieve parameters from the effect
var sizeCompletion = fx("Size Completion (%)") / 100;
var widthCompletion = fx("Width Completion (%)") / 100;
var heightCompletion = fx("Height Completion (%)") / 100;
var maskPosOffset = [fx("Position Offset - X"), fx("Position Offset - Y")];
var radians = fx("Rotation") * Math.PI / 180;
var roundnessFactor = fx("Roundness Factor (%)") / 100;
var cornerRadius = Math.min(fx("Corner Radius"), Math.min(thisLayer.width, thisLayer.height) / 2 * roundnessFactor);

// Calculate adjusted width and height based on layer dimensions and completion percentages
var adjustedWidth = (thisLayer.width / 2) * widthCompletion * sizeCompletion;
var adjustedHeight = (thisLayer.height / 2) * heightCompletion * sizeCompletion;

// Retrieve individual corner roundness %
var topLeftRadius = fx("Top Left Corner (%)") / 100 * cornerRadius;
var topRightRadius = fx("Top Right Corner (%)") / 100 * cornerRadius;
var bottomRightRadius = fx("Bottom Right Corner (%)") / 100 * cornerRadius;
var bottomLeftRadius = fx("Bottom Left Corner (%)") / 100 * cornerRadius;

// Calculate the eight points of the beveled rectangle
var vertices = [
    [adjustedWidth - bottomRightRadius, adjustedHeight], 
    [adjustedWidth, adjustedHeight - bottomRightRadius], 
    [adjustedWidth, -adjustedHeight + topRightRadius], 
    [adjustedWidth - topRightRadius, -adjustedHeight], 
    [-adjustedWidth + topLeftRadius, -adjustedHeight], 
    [-adjustedWidth, -adjustedHeight + topLeftRadius], 
    [-adjustedWidth, adjustedHeight - bottomLeftRadius], 
    [-adjustedWidth + bottomLeftRadius, adjustedHeight]
];

// Tangent vectors for rounding the corners
var inTangents = Array(vertices.length).fill([0, 0]);
var outTangents = [
    [bottomRightRadius, 0], [0, 0], [0, -topRightRadius], [0, 0],
    [-topLeftRadius, 0], [0, 0], [0, bottomLeftRadius], [0, 0]
];

// Function to rotate a point around a specific center
function rotatePoint(point, angle) {
    var cos = Math.cos(angle), sin = Math.sin(angle);
    return [point[0] * cos - point[1] * sin, point[0] * sin + point[1] * cos];
}

// Determine if the layer is a shape layer
var isShapeLayer = thisLayer.content == "Contents";
var center = isShapeLayer ? maskPosOffset : [thisLayer.width / 2 + maskPosOffset[0], thisLayer.height / 2 + maskPosOffset[1]];

// Rotate and offset vertices and tangents
vertices = vertices.map(function(point) {
    var rotated = rotatePoint(point, radians);
    return [rotated[0] + center[0], rotated[1] + center[1]];
});
inTangents = inTangents.map(t => rotatePoint(t, radians));
outTangents = outTangents.map(t => rotatePoint(t, radians));

// Create the path with rotation applied
createPath(vertices, inTangents, outTangents, true);
