let n = thisComp.layer("controls").effect("n")("Slider");
let freq = thisComp.layer("controls").effect("freq")("Slider");
let vertices = [];
let x, y, pt, phase;

let u = 1
let v = 10;
let a = thisComp.layer("controls").effect("a")("Slider"); // inner radius
let c = thisComp.layer("controls").effect("c")("Slider") // outer radius

for (i = 0; i < n; i++) {
  seedRandom(i, true)
  pt = i / n;
  phase = time * freq * Math.PI * 2 + pt * Math.PI * 2
  x = (c + a * Math.cos(v * phase)) * Math.cos(u * phase);
  y = (c + a * Math.cos(v * phase)) * Math.sin(u * phase)
  vertices[i] = [x, y];
}

createPath(vertices, [], [], 1)
