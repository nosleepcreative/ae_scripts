var l = effect("nsc_motionTrails_v1.0")("Target Layer");
var limit = 500
var vertices = [];

// calculate the trail length in frame numbers
var currentFrame = timeToFrames(time)
var trimTrail = clamp(Math.floor(effect("nsc_motionTrails_v1.0")("Trail Length")), 1, limit)
var trailLength = clamp(currentFrame - trimTrail, 0, limit) // keep it positive
var xOffset = effect("xOffset")("Slider")

// main: generating points from current time
for (i = currentFrame; i > trailLength; i--) {
    t = framesToTime(i) // time value
    pos = l.transform.anchorPoint.valueAtTime(t);
    ap = l.toWorld([0, pos[1]], t);
    ap -= [thisComp.width, thisComp.height] / 2;
    vertices.push(ap);

    for (j = 0; j < vertices.length; j++) {
        vertices[j][0] = j * xOffset
    }

}
// create the path
createPath(vertices, [], [], 0)