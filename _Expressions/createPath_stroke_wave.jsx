var pts = effect("nsc_create_squiggly")("Points");
var myLength = effect("nsc_create_squiggly")("Length");

var amp = effect("nsc_create_squiggly")("Wave Height");
var freq = effect("nsc_create_squiggly")("Wave Speed");
var widthFactor = effect("nsc_create_squiggly")("Wave Width Factor");
var offset = degreesToRadians(effect("nsc_create_squiggly")("Phase")) * Math.PI * 2;
//var dir = effect("nsc_create_squiggly")("Direction")
var vertices = [
    [0, 0]
];
var x, y, pt, phase;


for (i = 0; i < pts; i++) {
    pt = i / pts / widthFactor;
    phase = time * freq * Math.PI * 2 + pt * Math.PI;
    x = myLength * widthFactor * pt
    w1 = Math.sin(phase + offset);
    y = amp * w1;
    //tilt dev
    // y2 = amp * Math.sin(phase+w1/dir+offset);
    vertices[i] = [x, y];
}

createPath(vertices, [], [], 0)