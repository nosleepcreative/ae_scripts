// createPath_layerTrail.jsx
// Apply to a path property eg. Solid +
// Shape stroke + dashes
var l = thisComp.layer("shape layer")
var vertices = [];
var tt = thisComp.duration / thisComp.frameDuration;
var f = thisComp.frameDuration;

currentFrame = timeToFrames(time);
trimTrail = 20
trailLength = currentFrame - trimTrail
for (i = currentFrame; i < trailLength; i--) {
    t = framesToTime(i);
    pos = l.transform.position.valueAtTime(t)
    vertices[n] = pos


}
createPath(vertices.reverse(), [], [], 0)
