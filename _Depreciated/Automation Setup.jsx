// automation setup for NCAA March Madness
app.beginUndoGroup("automationSetup");
var comp = app.project.activeItem;
var items = "file,c1,c2,teamName,code";
var itemsArray = items.split(",");
var myText, offset;

var x = comp.width/5;
var y = 33;

// create var

var myShapeLayer = comp.layers.addShape();
myShapeLayer.name = ("metadataBar");

// Create shape layer & shape (Ellipse, Rect,)
var shapeGroup = myShapeLayer.property("Contents").addProperty("ADBE Vector Group");
var myRect = shapeGroup.property("Contents").addProperty("ADBE Vector Shape - Rect"); //
myRect.property("Size").setValue([comp.width,50]);
var myStroke = shapeGroup.property("Contents").addProperty("ADBE Vector Graphic - Fill");
myStroke.property("Color").setValue([0,0,0,0]);
myStroke.property("Opacity").setValue([100]);
myShapeLayer.transform.position.expression = "[thisComp.width/2,25]"
myShapeLayer.guideLayer = true;

// create text layers for data input
for (var i = 0; i < itemsArray.length; i++) {
    myText = comp.layers.addText(itemsArray[i]);
    myText.name = itemsArray[i];
    myText.guideLayer = true;
    myText.property("Position").setValue([50 + x * i, y]);
    myText.moveBefore(comp.layer(2+i))
}

//setup user controls
var myNull = comp.layers.addNull();
myNull.name = "USER_CONTROLS";
var myFX = "userc1,userc2,c1,c2"
var myCB = "switchColor,override_primary,override_secondary,switchOverrides";

var myFXarray = myFX.split(",");
var myCBarray = myCB.split(",");

var efx;

// add fill controls
for (var i = 0; i < myFXarray.length; i++) {
    efx = myNull.property("Effects").addProperty("fill");
    efx.name = myFXarray[i];
}

/*// add solid Composite
efx = myNull.property("Effects").addProperty("Solid Composite");
efx.name = "overrideColor_1"
efx = myNull.property("Effects").addProperty("Solid Composite");
efx.name = "overrideColor_2"
*/
// add checkbox controls;
for (var i = 0; i < myCBarray.length; i++) {
    efx = myNull.property("Effects").addProperty("Checkbox Control");
    efx.name = myCBarray[i];
}

// create solid layers "Primary" "Secondary"
var priSolid =comp.layers.addSolid([0, 0, 0], " Primary Solid", comp.width, comp.height, comp.pixelAspect, comp.duration);
priSolid.moveToEnd()
priSolid.guideLayer = true;
var secSolid =comp.layers.addSolid([0, 0, 0], " Secondary Solid", comp.width, comp.height, comp.pixelAspect, comp.duration);
secSolid.moveToEnd()
secSolid.guideLayer = true;
// Write expressions
var c1Exp = 'var myNull =thisComp.layer("USER_CONTROLS");\
var switchCB = myNull.effect("switchColor")("Checkbox");\
var overridePrimary = myNull.effect("override_primary")("Checkbox");\
var switchOverrides = myNull.effect("switchOverrides")("Checkbox");\
var userC1 = myNull.effect("userc1")("Color");\
var userC2 = myNull.effect("userc2")("Color");\
switchCB==1? txt = thisComp.layer("c2").text.sourceText:txt = thisComp.layer("c1").text.sourceText;\
c = parseInt(txt,16);\
r = c >> 16;\
g = (c & 0x00ff00) >> 8;\
b = c & 0xff; [r,g,b,255]/255\
if(overridePrimary==1){userC1;};\
if(switchOverrides==1){userC2;};\
';
var c2Exp = 'var myNull =thisComp.layer("USER_CONTROLS");\
var switchCB = myNull.effect("switchColor")("Checkbox");\
var overrideSecondary = myNull.effect("override_secondary")("Checkbox");\
var switchOverrides = myNull.effect("switchOverrides")("Checkbox");\
var userC1 = myNull.effect("userc1")("Color");\
var userC2 = myNull.effect("userc2")("Color");\
switchCB==0? txt = thisComp.layer("c2").text.sourceText:txt = thisComp.layer("c1").text.sourceText;\
c = parseInt(txt,16);\
r = c >> 16;\
g = (c & 0x00ff00) >> 8;\
b = c & 0xff; [r,g,b,255]/255\
if(overrideSecondary==1){userC2;};\
if(switchOverrides==1){userC1;};\
';

var userc1Exp = 'bool = thisComp.layer("USER_CONTROLS").effect("override_primary")("Checkbox");\ bool==0? 100:0';
var userc2Exp = 'bool = thisComp.layer("USER_CONTROLS").effect("override_secondary")("Checkbox");\ bool==0? 100:0';

var userc1ExpCd = 'var cb = thisComp.layer("USER_CONTROLS").effect("switchOverrides")("Checkbox");\
cb==0? thisComp.layer("USER_CONTROLS").effect("userc1")("Color"):thisComp.layer("USER_CONTROLS").effect("userc2")("Color")';


var userc2ExpCd = 'var cb = thisComp.layer("USER_CONTROLS").effect("switchOverrides")("Checkbox");\
cb==1? thisComp.layer("USER_CONTROLS").effect("userc1")("Color"):thisComp.layer("USER_CONTROLS").effect("userc2")("Color")';

//apply expressions
myNull.effect("c1")("Color").expression = c1Exp;
myNull.effect("c2")("Color").expression = c2Exp;
//myNull.effect("overrideColor_1")("Source Opacity").expression = userc1Exp;
//myNull.effect("overrideColor_2")("Source Opacity").expression = userc2Exp;
//myNull.effect("overrideColor_1")("Color").expression = userc1ExpCd;
//myNull.effect("overrideColor_2")("Color").expression = userc2ExpCd;
