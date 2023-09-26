
// radial random displacement
seed = 1;
shift = 0;
radiusRange = ;
phaseRange = ;

seedRandom(seed,true);
radius = random(radiusRange[0],radiusRange[1]);
phase =  random(phaseRange[0],phaseRange[1]);
x = radius*Math.sin(phase);
y = radius*Math.cos(phase);

[x,y];



// better random displacement
var null = [0,0,0];
var range = pos+[50,50,50];
var pos = random(range,-range);

pos;
