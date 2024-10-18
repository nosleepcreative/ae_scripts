let seed = 10;
let dashRange = [200, 400];
let gapRange = [0, 100];

seedRandom(seed, true);

let myIndex = thisProperty.propertyGroup(2).propertyIndex;
let mydash = random(dashRange[0], dashRange[1]);
let mygap = random(gapRange[0], gapRange[1]);
let oldPt = content("Path 1").path.points(time)[1]

let startPt = oldPt + [mygap, 0];
let endPt = startPt + [mydash, 0]
let vertices = [startPt, endPt];

createPath(vertices, [], [], 0);
