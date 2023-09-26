
/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"activeId":2,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":null,"windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"Dialog","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["left","top"]}},"item-1":{"id":1,"type":"Progressbar","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[300,14],"alignment":"center","helpTip":null}},"item-2":{"id":2,"type":"StaticText","parentId":0,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"layers created. Elapsed time: 0s:13ms","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}}},"order":[0,2,1],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"}}
*/ 

// DIALOG
// ======
var dialog = new Window("dialog"); 
    dialog.text = "Dialog"; 
    dialog.orientation = "column"; 
    dialog.alignChildren = ["left","top"]; 
    dialog.spacing = 10; 
    dialog.margins = 16; 

var statictext1 = dialog.add("statictext", undefined, undefined, {name: "statictext1"}); 
    statictext1.text = "layers created. Elapsed time: 0s:13ms"; 

var progressbar1 = dialog.add("progressbar", undefined, undefined, {name: "progressbar1"}); 
    progressbar1.maxvalue = 100; 
    progressbar1.value = 50; 
    progressbar1.preferredSize.width = 300; 
    progressbar1.preferredSize.height = 14; 
    progressbar1.alignment = ["center","top"]; 

dialog.show();

