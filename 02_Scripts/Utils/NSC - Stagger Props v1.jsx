/*
Code for Import https://scriptui.joonas.me — (Triple click to select):
{"activeId":11,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":null,"windowType":"Palette","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"nsc_stagger_props_v1","preferredSize":[200,0],"margins":36,"orientation":"column","spacing":15,"alignChildren":["left","top"]}},"item-1":{"id":1,"type":"Checkbox","parentId":0,"style":{"enabled":true,"varName":null,"text":"position","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":true}},"item-2":{"id":2,"type":"Checkbox","parentId":0,"style":{"enabled":true,"varName":null,"text":"rotation","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":true}},"item-3":{"id":3,"type":"Checkbox","parentId":0,"style":{"enabled":true,"varName":null,"text":"scale","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":true}},"item-4":{"id":4,"type":"Checkbox","parentId":0,"style":{"enabled":true,"varName":null,"text":"opacity","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":true}},"item-5":{"id":5,"type":"Checkbox","parentId":0,"style":{"enabled":true,"varName":null,"text":"timeRemap","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":true}},"item-8":{"id":8,"type":"Divider","parentId":0,"style":{"enabled":true,"varName":"div"}},"item-10":{"id":10,"type":"StaticText","parentId":0,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":true,"scrolling":false},"softWrap":true,"text":"The first selected layer will become the control layer with a Slider for the delay value","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-11":{"id":11,"type":"Button","parentId":0,"style":{"enabled":true,"varName":null,"text":"Execute","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}}},"order":[0,10,8,1,2,3,4,5,11],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"}}
*/

// PALETTE
// =======
var palette = new Window("palette");
palette.text = "nsc_stagger_props_v1";
palette.preferredSize.width = 200;
palette.orientation = "column";
palette.alignChildren = ["left", "top"];
palette.spacing = 15;
palette.margins = 36;

var statictext1 = palette.add("group");
statictext1.orientation = "column";
statictext1.alignChildren = ["left", "center"];
statictext1.spacing = 0;

statictext1.add("statictext", undefined, "The first selected layer will", {
    name: "statictext1",
    multiline: true
});
statictext1.add("statictext", undefined, "become the control layer with a", {
    name: "statictext1",
    multiline: true
});
statictext1.add("statictext", undefined, "Slider for the delay value", {
    name: "statictext1",
    multiline: true
});

var div = palette.add("panel", undefined, undefined, {
    name: "div"
});
div.alignment = "fill";

var checkbox1 = palette.add("checkbox", undefined, undefined, {
    name: "checkbox1"
});
checkbox1.text = "position";

var checkbox2 = palette.add("checkbox", undefined, undefined, {
    name: "checkbox2"
});
checkbox2.text = "rotation";

var checkbox3 = palette.add("checkbox", undefined, undefined, {
    name: "checkbox3"
});
checkbox3.text = "scale";

var checkbox4 = palette.add("checkbox", undefined, undefined, {
    name: "checkbox4"
});
checkbox4.text = "opacity";

var checkbox5 = palette.add("checkbox", undefined, undefined, {
    name: "checkbox5"
});
checkbox5.text = "timeRemap";

var button1 = palette.add("button", undefined, undefined, {
    name: "button1"
});
button1.text = "Execute";

palette.show();

//____________________________________________________________________________________________________________
// setup
var myComp = app.project.activeItem;
var myLayers = myComp.selectedLayers;
var ctrl = myComp.selectedLayers[0];
// ——————————————————————————————————————————————————————————————————————

function addSlider(layer, fxName) {
    try {
        layer.effect(fxName)("Slider")
    } catch (e) {
        efx = layer.property("Effects").addProperty("ADBE Slider Control");
        efx.name = fxName.toString()
    }
}

function makeExp1(prop) {
    exp = "ctrl = thisComp.layer('" + ctrl.name + "')\nvar delay = " + "ctrl.effect('" + efx.name + "')('Slider');" + "\nmyIndex =index- ctrl.index;\nvar offset = myIndex*delay*thisComp.frameDuration;\nctrl." + prop + ".valueAtTime(time-offset)"
    return exp
}

function makeExp(prop) {
    exp = "ctrl = thisComp.layer('" + ctrl.name + "')\nvar delay = " + "ctrl.effect('" + efx.name + "')('Slider');" + "\nmyIndex = ctrl.index > index ? ctrl.index - index : index - ctrl.index;\nvar offset = myIndex*delay*thisComp.frameDuration;\nctrl." + prop + ".valueAtTime(time-offset)"
    return exp
}

function connectprop(prop) {
    makeExp("transform." + prop.replace("Rotate Z", "rotation").toLowerCase())
    for (i = 1; i < myLayers.length; i++) {
        s = "ADBE " + prop;
        myLayers[i].property("ADBE Transform Group").property(s).expression = exp;
    }
}

function connectTimeRemap(expression) {
    makeExp("timeRemap")
    myLayers[0].timeRemapEnabled = true;
    for (i = 1; i < myLayers.length; i++) {
        myLayers[i].timeRemapEnabled = true;
        myLayers[i].property("ADBE Time Remapping").expression = exp;
    }
}

// ——————————————————————————————————————————————————————————————————————

app.beginUndoGroup("addCtrls");
addSlider(ctrl, "delay")

function addCtrls() {
    if (checkbox1.value == 1) connectprop("Position")
    if (checkbox2.value == 1) connectprop("Rotate Z")
    if (checkbox3.value == 1) connectprop("Scale")
    if (checkbox4.value == 1) connectprop("Opacity")
    if (checkbox5.value == 1) connectTimeRemap()
}
//____________________________________________________________________________________________________________
button1.onClick = function doIt() {
    app.beginUndoGroup("addCtrls");
    addCtrls()
}


// need random stagger