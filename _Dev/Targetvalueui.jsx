/*
Code for Import https://scriptui.joonas.me — (Triple click to select):
{"activeId":33,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":"TargetLayer","windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"nsc_targetValue","preferredSize":[200,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["left","top"]}},"item-12":{"id":12,"type":"Checkbox","parentId":49,"style":{"enabled":true,"varName":null,"text":"Opacity","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-18":{"id":18,"type":"DropDownList","parentId":23,"style":{"enabled":true,"varName":null,"text":"DropDownList","listItems":"","preferredSize":[200,0],"alignment":null,"selection":0,"helpTip":null}},"item-23":{"id":23,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":null,"creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Target Layer","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-24":{"id":24,"type":"EditText","parentId":23,"style":{"enabled":true,"varName":null,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"1","justify":"left","preferredSize":[200,0],"alignment":null,"helpTip":null}},"item-25":{"id":25,"type":"StaticText","parentId":23,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Offset (in sec)","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-33":{"id":33,"type":"Panel","parentId":49,"style":{"enabled":true,"varName":null,"creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Rotation","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-34":{"id":34,"type":"Checkbox","parentId":33,"style":{"enabled":true,"varName":null,"text":"X","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-35":{"id":35,"type":"Checkbox","parentId":33,"style":{"enabled":true,"varName":null,"text":"Y","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-36":{"id":36,"type":"Checkbox","parentId":33,"style":{"enabled":true,"varName":null,"text":"Z","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-37":{"id":37,"type":"Panel","parentId":49,"style":{"enabled":true,"varName":null,"creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Position","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-38":{"id":38,"type":"Checkbox","parentId":37,"style":{"enabled":true,"varName":null,"text":"X","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-39":{"id":39,"type":"Checkbox","parentId":37,"style":{"enabled":true,"varName":null,"text":"Y","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-40":{"id":40,"type":"Checkbox","parentId":37,"style":{"enabled":true,"varName":null,"text":"Z","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-41":{"id":41,"type":"Panel","parentId":49,"style":{"enabled":true,"varName":null,"creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Scale","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-42":{"id":42,"type":"Checkbox","parentId":41,"style":{"enabled":true,"varName":null,"text":"X","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-43":{"id":43,"type":"Checkbox","parentId":41,"style":{"enabled":true,"varName":null,"text":"Y","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-44":{"id":44,"type":"Checkbox","parentId":41,"style":{"enabled":true,"varName":null,"text":"Z","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-47":{"id":47,"type":"Button","parentId":0,"style":{"enabled":true,"varName":null,"text":"?","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-48":{"id":48,"type":"Button","parentId":0,"style":{"enabled":true,"varName":null,"text":"Execute","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-49":{"id":49,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":null,"creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Properties to stagger","preferredSize":[0,0],"margins":10,"orientation":"row","spacing":10,"alignChildren":["left","top"],"alignment":null}}},"order":[0,23,18,25,24,49,37,38,39,40,41,42,43,44,33,34,35,36,12,48,47],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"itemReferenceList":"None"}}
*/
// SETUP
var comp = app.project.activeItem
var mySelectedLayers = comp.selectedLayers;
var numlayers = comp.numLayers;

// Get target layer array
var dropdown1_array= [];
for(var i=1;i<numlayers;i++){
    dropdown1_array[i] = comp.layer(i).name; // puts all layers into an array
}


// TARGETLAYER
// ===========
var TargetLayer = new Window("dialog");
    TargetLayer.text = "nsc_targetValue";
    TargetLayer.preferredSize.width = 200;
    TargetLayer.orientation = "column";
    TargetLayer.alignChildren = ["left","top"];
    TargetLayer.spacing = 10;
    TargetLayer.margins = 16;

// PANEL1
// ======
var panel1 = TargetLayer.add("panel", undefined, undefined, {name: "panel1"});
    panel1.text = "Target Layer";
    panel1.orientation = "column";
    panel1.alignChildren = ["left","top"];
    panel1.spacing = 10;
    panel1.margins = 10;

var dropdown1 = panel1.add("dropdownlist", undefined, undefined, {name: "dropdown1", items: dropdown1_array});
    dropdown1.selection = 0;
    dropdown1.preferredSize.width = 200;

var statictext1 = panel1.add("statictext", undefined, undefined, {name: "statictext1"});
    statictext1.text = "Offset (in sec)";

var edittext1 = panel1.add('edittext {properties: {name: "edittext1"}}');
    edittext1.text = "1";
    edittext1.preferredSize.width = 200;

// PANEL2
// ======
var panel2 = TargetLayer.add("panel", undefined, undefined, {name: "panel2"});
    panel2.text = "Properties to stagger";
    panel2.orientation = "row";
    panel2.alignChildren = ["left","top"];
    panel2.spacing = 10;
    panel2.margins = 10;

// PANEL3
// ======
var panel3 = panel2.add("panel", undefined, undefined, {name: "panel3"});
    panel3.text = "Position";
    panel3.orientation = "column";
    panel3.alignChildren = ["left","top"];
    panel3.spacing = 10;
    panel3.margins = 10;

var checkbox1 = panel3.add("checkbox", undefined, undefined, {name: "checkbox1"});
    checkbox1.text = "X";

var checkbox2 = panel3.add("checkbox", undefined, undefined, {name: "checkbox2"});
    checkbox2.text = "Y";

var checkbox3 = panel3.add("checkbox", undefined, undefined, {name: "checkbox3"});
    checkbox3.text = "Z";

// PANEL4
// ======
var panel4 = panel2.add("panel", undefined, undefined, {name: "panel4"});
    panel4.text = "Scale";
    panel4.orientation = "column";
    panel4.alignChildren = ["left","top"];
    panel4.spacing = 10;
    panel4.margins = 10;

var checkbox4 = panel4.add("checkbox", undefined, undefined, {name: "checkbox4"});
    checkbox4.text = "X";

var checkbox5 = panel4.add("checkbox", undefined, undefined, {name: "checkbox5"});
    checkbox5.text = "Y";


// PANEL5
// ======
var panel5 = panel2.add("panel", undefined, undefined, {name: "panel5"});
    panel5.text = "Rotation";
    panel5.orientation = "column";
    panel5.alignChildren = ["left","top"];
    panel5.spacing = 10;
    panel5.margins = 10;

var checkbox7 = panel5.add("checkbox", undefined, undefined, {name: "checkbox7"});
    checkbox7.text = "X";

var checkbox8 = panel5.add("checkbox", undefined, undefined, {name: "checkbox8"});
    checkbox8.text = "Y";

var checkbox9 = panel5.add("checkbox", undefined, undefined, {name: "checkbox9"});
    checkbox9.text = "Z";

// PANEL2
// ======
var checkbox10 = panel2.add("checkbox", undefined, undefined, {name: "checkbox10"});
    checkbox10.text = "Opacity";

// TARGETLAYER
// ===========
var button1 = TargetLayer.add("button", undefined, undefined, {name: "button1"});
    button1.text = "Execute";

var button2 = TargetLayer.add("button", undefined, undefined, {name: "button2"});
    button2.text = "?";

TargetLayer.show();
