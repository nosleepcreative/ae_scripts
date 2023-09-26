var myComp = app.project.activeItem;

var myLayers = myComp.layers;

app.beginUndoGroup("New Cam");

myCam = myLayers.addCamera("myCamera", [0, 0]);
myCam.transform.position.setValue([960,540,0]);

myNull = myLayers.addNull();
myNull.threeDLayer= true;
myNull.name = 'camNull'

efx = myNull.effect.addProperty("Slider Control");
efx.name = 'vel'

myProp = myNull.transform.position;
myProp.expressionEnabled = true;
myProp.expression = 'x = 0;\ny = 0;\nz = time*effect("vel")("Slider");\nvalue +[x,y,z]';
myCam.parent = myNull;

app.endUndoGroup();
