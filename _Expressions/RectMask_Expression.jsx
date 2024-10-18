//Rect Mask v1.3.1

// Get current mask's name, initialize the effect variable
var maskName = thisProperty.propertyGroup(1).name;
var fx = effect(maskName.split('<')[1].split('>')[0]) || effect("Rect Mask");

// Retrieve the effect using the dynamic effect name
var sizeCompletion = fx("Size Completion (%)") / 100;
var widthCompletion = fx("Width Completion (%)") / 100;
var heightCompletion = fx("Height Completion (%)")/ 100;

var maskPosOffset = [fx("Position Offset - X"),fx("Position Offset - Y")];
var radians = fx("Rotation") * Math.PI / 180;
var roundnessFactor = fx("Roundness Factor (%)") / 100;
var cornerRadius = Math.min(fx("Corner Radius"), Math.min(thisLayer.width, thisLayer.height) / 2 * roundnessFactor);

// Calculate adjusted width and height based on layer dimensions and completion percentages
var adjustedWidth = (thisLayer.width / 2) * widthCompletion * sizeCompletion;
var adjustedHeight = (thisLayer.height / 2) * heightCompletion * sizeCompletion;

// Determine the minimum value to maintain consistent rounding
var minDimension = Math.min(adjustedWidth, adjustedHeight);
var roundnessFactor = fx("Roundness Factor (%)") / 100;
var maxRoundness = minDimension * roundnessFactor;

// Retrieve the roundness value and ensure it doesn't exceed the maximum allowed by the dimensions
var cornerRadius = fx("Corner Radius");
cornerRadius = Math.min(maxRoundness, cornerRadius);

// Retrieve individual corner roundness %
var topLeftRadius = fx("Top Left Corner (%)") / 100 * cornerRadius;
var topRightRadius = fx("Top Right Corner (%)")/ 100 *cornerRadius;
var bottomRightRadius = fx("Bottom Right Corner (%)")/ 100*cornerRadius;
var bottomLeftRadius =  fx("Bottom Left Corner (%)")/ 100*cornerRadius;

// Determine if the layer is a shape layer
var isShapeLayer = thisLayer.content == "Contents";
var center = isShapeLayer ? maskPosOffset : [thisLayer.width / 2 + maskPosOffset[0], thisLayer.height / 2 + maskPosOffset[1]];

// Calculate the eight points of the beveled rectangle
var vertices = [
    [adjustedWidth - bottomRightRadius, adjustedHeight], // Bottom right 1
    [adjustedWidth, adjustedHeight - bottomRightRadius], // Bottom right 2
    [adjustedWidth, -adjustedHeight + topRightRadius], // Top right 2
    [adjustedWidth - topRightRadius, -adjustedHeight], // Top right 1
    [-adjustedWidth + topLeftRadius, -adjustedHeight], // Top left 1
    [-adjustedWidth, -adjustedHeight + topLeftRadius], // Top left 2
    [-adjustedWidth, adjustedHeight - bottomLeftRadius], // Bottom left 2
    [-adjustedWidth + bottomLeftRadius, adjustedHeight] // Bottom left 1
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
vertices = vertices.map(function(point) {
    var rotated = rotatePoint(point, radians);
    return [rotated[0] + center[0], rotated[1] + center[1]];
});
inTangents = inTangents.map(t => rotatePoint(t, radians));
outTangents = outTangents.map(t => rotatePoint(t, radians));

// Create the path with rotation applied
createPath(vertices, inTangents, outTangents, true);
