// user variables
var tgt = content("Rectangle 1").content("Path 1");
var size = [effect("x")("Slider"), effect("y")("Slider")];
var diameter = size[0] * 2 + size[1] * 2;
var ctrlPoint = effect("Top Notch Position")("Slider") * size[0] / diameter; // normalize from 0 to 100 on top
var y = effect("Top Notch Y Position")("Slider");

// calculate adjacent if angle is known
var adj = y / Math.sin(degreesToRadians(45));

// create additional point
var p1Pct = ctrlPoint - adj;
var p3Pct = ctrlPoint + adj;
p1 = tgt.path.pointOnPath(p1Pct % 100 / 100);
p2 = tgt.path.pointOnPath(ctrlPoint % 100 / 100);

(p2Pct % 100 / 100) > .5 ? p2 += [0, -y] : p2 += [0, y]
p2 += [0, ];
p3 = tgt.path.pointOnPath(p3Pct % 100 / 100);
createPath([p1, p2, p3], [], [], 0)