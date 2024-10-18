var panelGlobal = this;

/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"text":"Layers To Grid","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["left","top"],"varName":null,"windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"enabled":true}},"item-20":{"id":20,"type":"Group","parentId":64,"style":{"preferredSize":[0,0],"margins":0,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null,"varName":null,"enabled":true}},"item-41":{"id":41,"type":"StaticText","parentId":51,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Rows","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-42":{"id":42,"type":"Group","parentId":20,"style":{"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null,"varName":null,"enabled":true}},"item-45":{"id":45,"type":"StaticText","parentId":42,"style":{"text":"Y spacing","justify":"left","preferredSize":[0,0],"alignment":null,"varName":null,"helpTip":null,"softWrap":true,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"enabled":true}},"item-46":{"id":46,"type":"EditText","parentId":42,"style":{"text":"100","preferredSize":[0,0],"alignment":null,"varName":null,"helpTip":null,"softWrap":false,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"enabled":true,"justify":"left"}},"item-47":{"id":47,"type":"Group","parentId":20,"style":{"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null,"varName":null,"enabled":true}},"item-48":{"id":48,"type":"EditText","parentId":47,"style":{"text":"100","preferredSize":[0,0],"alignment":null,"varName":null,"helpTip":null,"softWrap":false,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"enabled":true,"justify":"left"}},"item-49":{"id":49,"type":"StaticText","parentId":47,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"X spacing","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-50":{"id":50,"type":"Group","parentId":64,"style":{"preferredSize":[0,0],"margins":0,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null,"varName":null,"enabled":true}},"item-51":{"id":51,"type":"Group","parentId":50,"style":{"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null,"varName":null,"enabled":true}},"item-52":{"id":52,"type":"EditText","parentId":51,"style":{"text":"10","preferredSize":[60,0],"alignment":null,"varName":null,"helpTip":null,"softWrap":false,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"enabled":true,"justify":"left"}},"item-54":{"id":54,"type":"Group","parentId":50,"style":{"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null,"varName":null,"enabled":true}},"item-55":{"id":55,"type":"EditText","parentId":54,"style":{"text":"10","preferredSize":[60,0],"alignment":null,"varName":null,"helpTip":null,"softWrap":false,"creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"enabled":true,"justify":"left"}},"item-56":{"id":56,"type":"StaticText","parentId":54,"style":{"text":"Columns","justify":"left","preferredSize":[0,0],"alignment":null,"varName":null,"helpTip":null,"softWrap":true,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"enabled":true}},"item-57":{"id":57,"type":"Checkbox","parentId":59,"style":{"enabled":true,"varName":null,"text":"Shuffle layers","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-59":{"id":59,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":"center"}},"item-62":{"id":62,"type":"IconButton","parentId":59,"style":{"enabled":true,"varName":"Grid","text":"","preferredSize":[0,0],"creationProps":{"style":"toolbutton","toggle":false},"iconButtonStroke":false,"image":["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsSAAALEgHS3X78AAAAgklEQVRIiWP8//8/Az0AE11sYWBgYIGzsn2xee0Dw9TNglD59wwMDAIkyjMwTN3MyMBARx+NWkQ2YEFif8Ai/wCNrUCiPBwwDut89B6L/AOGqZsNofLnGbAFHX55Blg+Q44jzMyGqlEBixpC8nAw/JL3aD4iG4zmo9F8NIwtGn75CACx+zfzhNndqwAAAABJRU5ErkJggg=="],"alignment":null,"helpTip":null}},"item-63":{"id":63,"type":"IconButton","parentId":59,"style":{"enabled":true,"varName":"StaggeredGrid","text":"","preferredSize":[0,0],"creationProps":{"style":"toolbutton","toggle":false},"iconButtonStroke":false,"image":["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsSAAALEgHS3X78AAAAkklEQVRIiWP8//8/Az0AE11sYWBgYIGzsn2xee0gw9TNDlD5AwwMDPYkyjMwTN3MyMBARx+NWkQ2YEFiH8QifwEHm1h5OGAcxvkIHUDyBTq4wDB1cwFUfgIDA4MBhgpYviLaImyZDxUYEKEGDoZf8h4EiYG8fIUTDOd8RF6+ITpfIccRpfkGr/zwS97Dz6Lhl48ADcUxYIl2DFwAAAAASUVORK5CYII="],"alignment":null,"helpTip":null}},"item-64":{"id":64,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}}},"order":[0,64,50,51,52,41,54,55,56,20,47,48,49,42,46,45,59,57,62,63],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"functionWrapper":false,"compactCode":false,"showDialog":true,"afterEffectsDockable":true,"itemReferenceList":"None"},"activeId":62}
*/ 

// DIALOG
// ======
var dialog = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette"); 
    if ( !(panelGlobal instanceof Panel) ) dialog.text = "Layers To Grid"; 
    dialog.orientation = "column"; 
    dialog.alignChildren = ["left","top"]; 
    dialog.spacing = 10; 
    dialog.margins = 16; 

// GROUP1
// ======
var group1 = dialog.add("group", undefined, {name: "group1"}); 
    group1.orientation = "row"; 
    group1.alignChildren = ["left","center"]; 
    group1.spacing = 10; 
    group1.margins = 0; 

// GROUP2
// ======
var group2 = group1.add("group", undefined, {name: "group2"}); 
    group2.orientation = "column"; 
    group2.alignChildren = ["left","top"]; 
    group2.spacing = 10; 
    group2.margins = 0; 

// GROUP3
// ======
var group3 = group2.add("group", undefined, {name: "group3"}); 
    group3.orientation = "row"; 
    group3.alignChildren = ["left","center"]; 
    group3.spacing = 10; 
    group3.margins = 0; 

var edittext1 = group3.add('edittext {properties: {name: "edittext1"}}'); 
    edittext1.text = "10"; 
    edittext1.preferredSize.width = 60; 

var statictext1 = group3.add("statictext", undefined, undefined, {name: "statictext1"}); 
    statictext1.text = "Rows"; 

// GROUP4
// ======
var group4 = group2.add("group", undefined, {name: "group4"}); 
    group4.orientation = "row"; 
    group4.alignChildren = ["left","center"]; 
    group4.spacing = 10; 
    group4.margins = 0; 

var edittext2 = group4.add('edittext {properties: {name: "edittext2"}}'); 
    edittext2.text = "10"; 
    edittext2.preferredSize.width = 60; 

var statictext2 = group4.add("statictext", undefined, undefined, {name: "statictext2"}); 
    statictext2.text = "Columns"; 

// GROUP5
// ======
var group5 = group1.add("group", undefined, {name: "group5"}); 
    group5.orientation = "column"; 
    group5.alignChildren = ["left","top"]; 
    group5.spacing = 10; 
    group5.margins = 0; 

// GROUP6
// ======
var group6 = group5.add("group", undefined, {name: "group6"}); 
    group6.orientation = "row"; 
    group6.alignChildren = ["left","center"]; 
    group6.spacing = 10; 
    group6.margins = 0; 

var edittext3 = group6.add('edittext {properties: {name: "edittext3"}}'); 
    edittext3.text = "100"; 

var statictext3 = group6.add("statictext", undefined, undefined, {name: "statictext3"}); 
    statictext3.text = "X spacing"; 

// GROUP7
// ======
var group7 = group5.add("group", undefined, {name: "group7"}); 
    group7.orientation = "row"; 
    group7.alignChildren = ["left","center"]; 
    group7.spacing = 10; 
    group7.margins = 0; 

var edittext4 = group7.add('edittext {properties: {name: "edittext4"}}'); 
    edittext4.text = "100"; 

var statictext4 = group7.add("statictext", undefined, undefined, {name: "statictext4"}); 
    statictext4.text = "Y spacing"; 

// GROUP8
// ======
var group8 = dialog.add("group", undefined, {name: "group8"}); 
    group8.orientation = "row"; 
    group8.alignChildren = ["left","center"]; 
    group8.spacing = 10; 
    group8.margins = 0; 
    group8.alignment = ["center","top"]; 

var checkbox1 = group8.add("checkbox", undefined, undefined, {name: "checkbox1"}); 
    checkbox1.text = "Shuffle layers"; 

var Grid_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1A%00%00%00%1A%08%06%00%00%00%C2%A9JL%C3%8E%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%C3%92%C3%9D~%C3%BC%00%00%00%C2%82IDATH%C2%89c%C3%BC%C3%BF%C3%BF%3F%03%3D%00%13%5Dla%60%60%60%C2%81%C2%B3%C2%B2%7D%C2%B1y%C3%AD%03%C3%83%C3%94%C3%8D%C2%82P%C3%B9%C3%B7%0C%0C%0C%02%24%C3%8A30L%C3%9D%C3%8C%C3%88%C3%80%40G%1F%C2%8DZD6%60Ab%7F%C3%80%22%C3%BF%00%C2%8D%C2%AD%40%C2%A2%3C%1C0%0E%C3%AB%7C%C3%B4%1E%C2%8B%C3%BC%03%C2%86%C2%A9%C2%9B%0D%C2%A1%C3%B2%C3%A7%19%C2%B0%05%1D~y%06X%3EC%C2%8E%23%C3%8C%C3%8C%C2%86%C2%AAQ%01%C2%8B%1AB%C3%B2p0%C3%BC%C2%92%C3%B7h%3E%22%1B%C2%8C%C3%A6%C2%A3%C3%91%7C4%C2%8C-%1A~%C3%B9%08%00%C2%B1%C3%BB7%C3%B3%C2%84%C3%99%C3%9D%C2%AB%00%00%00%00IEND%C2%AEB%60%C2%82"; 
var Grid = group8.add("iconbutton", undefined, File.decode(Grid_imgString), {name: "Grid", style: "toolbutton"}); 

var StaggeredGrid_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1A%00%00%00%1A%08%06%00%00%00%C2%A9JL%C3%8E%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%C3%92%C3%9D~%C3%BC%00%00%00%C2%92IDATH%C2%89c%C3%BC%C3%BF%C3%BF%3F%03%3D%00%13%5Dla%60%60%60%C2%81%C2%B3%C2%B2%7D%C2%B1y%C3%AD%20%C3%83%C3%94%C3%8D%0EP%C3%B9%03%0C%0C%0C%C3%B6%24%C3%8A30L%C3%9D%C3%8C%C3%88%C3%80%40G%1F%C2%8DZD6%60Ab%1F%C3%84%22%7F%01%07%C2%9BXy8%60%1C%C3%86%C3%B9%08%1D%40%C3%B2%05%3A%C2%B8%C3%800us%01T~%02%03%03%C2%83%01%C2%86%0AX%C2%BE%22%C3%9A%22l%C2%99%0F%15%18%10%C2%A1%06%0E%C2%86_%C3%B2%1E%04%C2%89%C2%81%C2%BC%7C%C2%85%13%0C%C3%A7%7CD%5E%C2%BE!%3A_!%C3%87%11%C2%A5%C3%B9%06%C2%AF%C3%BC%C3%B0K%C3%9E%C3%83%C3%8F%C2%A2%C3%A1%C2%97%C2%8F%00%0D%C3%851%60%C2%89v%0C%5C%00%00%00%00IEND%C2%AEB%60%C2%82"; 
var StaggeredGrid = group8.add("iconbutton", undefined, File.decode(StaggeredGrid_imgString), {name: "StaggeredGrid", style: "toolbutton"}); 

dialog.layout.layout(true);
dialog.layout.resize();
dialog.onResizing = dialog.onResize = function () { this.layout.resize(); }

if ( dialog instanceof Window ) dialog.show();

