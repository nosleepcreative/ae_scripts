/*
Code for Import https://scriptui.joonas.me — (Triple click to select):
{"activeId":12,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":null,"windowType":"Palette","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"nsc_tileLayers_v1.0","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-2":{"id":2,"type":"StaticText","parentId":6,"style":{"enabled":true,"varName":"vertSpace","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Vertical Spacing","justify":"right","preferredSize":[118,0],"alignment":null,"helpTip":null}},"item-5":{"id":5,"type":"EditText","parentId":7,"style":{"enabled":true,"varName":"hspace","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":true},"softWrap":false,"text":"","justify":"center","preferredSize":[150,0],"alignment":null,"helpTip":null}},"item-6":{"id":6,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-7":{"id":7,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-8":{"id":8,"type":"StaticText","parentId":7,"style":{"enabled":true,"varName":"horiSpace","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Horizontal Spacing","justify":"right","preferredSize":[118,0],"alignment":null,"helpTip":null}},"item-9":{"id":9,"type":"EditText","parentId":10,"style":{"enabled":true,"varName":"threshold","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"1920","justify":"center","preferredSize":[150,0],"alignment":null,"helpTip":null}},"item-10":{"id":10,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-11":{"id":11,"type":"StaticText","parentId":10,"style":{"enabled":true,"varName":"myThreshold","creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Threshold","justify":"right","preferredSize":[118,0],"alignment":null,"helpTip":null}},"item-12":{"id":12,"type":"EditText","parentId":6,"style":{"enabled":true,"varName":"vspace","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":true},"softWrap":false,"text":"100","justify":"center","preferredSize":[150,0],"alignment":null,"helpTip":null}},"item-13":{"id":13,"type":"Divider","parentId":0,"style":{"enabled":true,"varName":null}},"item-14":{"id":14,"type":"Button","parentId":15,"style":{"enabled":true,"varName":"tileGrid","text":"Tile grid","justify":"center","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-15":{"id":15,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-16":{"id":16,"type":"Button","parentId":15,"style":{"enabled":true,"varName":"tileOneRow","text":"Tile one row","justify":"center","preferredSize":[100,0],"alignment":null,"helpTip":null}},"item-17":{"id":17,"type":"Checkbox","parentId":18,"style":{"enabled":true,"varName":"originCb","text":"Start at [0,0]","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":true}},"item-18":{"id":18,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-20":{"id":20,"type":"Checkbox","parentId":18,"style":{"enabled":true,"varName":"shuffleCb","text":"Shuffle layers?","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":true}}},"order":[0,7,8,5,6,2,12,10,11,9,18,20,17,13,15,14,16],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"}}
*/

// PALETTE
// =======
var palette = new Window("palette");
palette.text = "nsc_tileLayers_v1.0";
palette.orientation = "column";
palette.alignChildren = ["center", "top"];
palette.spacing = 10;
palette.margins = 16;

// GROUP1
// ======
var group1 = palette.add("group", undefined, {
    name: "group1"
});
group1.orientation = "row";
group1.alignChildren = ["left", "center"];
group1.spacing = 10;
group1.margins = 0;

var horiSpace = group1.add("statictext", undefined, undefined, {
    name: "horiSpace"
});
horiSpace.text = "Horizontal Spacing";
horiSpace.preferredSize.width = 118;
horiSpace.justify = "right";

var hspace = group1.add('edittext {justify: "center", properties: {name: "hspace", enterKeySignalsOnChange: true}}');
hspace.text = "100";
hspace.preferredSize.width = 150;

// GROUP2
// ======
var group2 = palette.add("group", undefined, {
    name: "group2"
});
group2.orientation = "row";
group2.alignChildren = ["left", "center"];
group2.spacing = 10;
group2.margins = 0;

var vertSpace = group2.add("statictext", undefined, undefined, {
    name: "vertSpace"
});
vertSpace.text = "Vertical Spacing";
vertSpace.preferredSize.width = 118;
vertSpace.justify = "right";

var vspace = group2.add('edittext {justify: "center", properties: {name: "vspace", enterKeySignalsOnChange: true}}');
vspace.text = "125";
vspace.preferredSize.width = 150;

// GROUP3
// ======
var group3 = palette.add("group", undefined, {
    name: "group3"
});
group3.orientation = "row";
group3.alignChildren = ["left", "center"];
group3.spacing = 10;
group3.margins = 0;

var myThreshold = group3.add("statictext", undefined, undefined, {
    name: "myThreshold"
});
myThreshold.text = "Threshold";
myThreshold.preferredSize.width = 118;
myThreshold.justify = "right";

var threshold = group3.add('edittext {justify: "center", properties: {name: "threshold"}}');
threshold.text = "1920";
threshold.preferredSize.width = 150;

// GROUP4
// ======
var group4 = palette.add("group", undefined, {
    name: "group4"
});
group4.orientation = "row";
group4.alignChildren = ["left", "center"];
group4.spacing = 10;
group4.margins = 0;

var shuffleCb = group4.add("checkbox", undefined, undefined, {
    name: "shuffleCb"
});
shuffleCb.text = "Shuffle layers?";
shuffleCb.value = true;

var originCb = group4.add("checkbox", undefined, undefined, {
    name: "originCb"
});
originCb.text = "Start at [0,0]";
originCb.value = true;

// PALETTE
// =======
var divider1 = palette.add("panel", undefined, undefined, {
    name: "divider1"
});
divider1.alignment = "fill";

// GROUP5
// ======
var group5 = palette.add("group", undefined, {
    name: "group5"
});
group5.orientation = "row";
group5.alignChildren = ["left", "center"];
group5.spacing = 10;
group5.margins = 0;

var tileGrid = group5.add("button", undefined, undefined, {
    name: "tileGrid"
});
tileGrid.text = "Tile grid";
tileGrid.preferredSize.width = 100;

var tileOneRow = group5.add("button", undefined, undefined, {
    name: "tileOneRow"
});
tileOneRow.text = "Tile one row";
tileOneRow.preferredSize.width = 100;


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////




// why conditional not working with function, shuffling mess

var myComp = app.project.activeItem;
var myLayers = myComp.selectedLayers;
var pos, s1, s2, tilePos;
// buttons
tileOneRow.onClick = function() {
    alert(h);
};
tileGrid.onClick = function() {
    myLayers = myComp.selectedLayers;
    tilePos = [
        [0, 0]
    ]; // FUCKKK YOU
    var h = parseInt(hspace.text);
    var v = parseInt(vspace.text);

    var shuffle = shuffleCb.value;
    var origin = originCb.value;
    var myWidthLimit = parseInt(threshold.text);

    if (myLayers.length == 0) {
        alert("No layers selected.")
    } else {
        if (shuffle == true) {
            shuffleArray(myLayers)
        }
        if (origin == false) {
            var L = myLayers[0];
            var S = L.sourceRectAtTime(0, true);
            tilePos[0] = [S.width, S.height] * L.transform.scale.value[0] / 100 / 2;
        }
        tileLayers(myLayers, h, v, myWidthLimit);
    }
}



////////////////////////////////////////////////////////////////////////////////

function shuffleArray(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function tileLayers(layers, hSpace, vSpace, threshold) {
    // shuffleArray(layers);
    app.beginUndoGroup("tileLayers");
    // tile everything into a row
    for (i = 1; i < layers.length; i++) {
        myLayer = layers[i];
        previousLayer = layers[i - 1];

        s1 = myLayer.sourceRectAtTime(1, false).width * myLayer.transform.scale.value[0] / 100 / 2;
        s2 = previousLayer.sourceRectAtTime(1, false).width * previousLayer.transform.scale.value[0] / 100 / 2;

        tilePos.push(tilePos[i - 1] + [s1 + hSpace + s2, 0])
    }
    // segment array into rows
    for (i = 0; i < tilePos.length; i++) {
        myLayer = layers[i];
        x = tilePos[i][0];
        y = tilePos[i][1];
        row = Math.floor(x / threshold);

        x -= row * threshold;

        y += row * vSpace;
        pos = [x, y];

        //myLayer.property("Position").setValue(pos);
        myLayer.transform.position.setValue(pos);
    }

}

// function doIt() {
//     if (myLayers.length == 0) {
//         alert("No layers selected.")
//     } else {
//         if (shuffle == true) {
//             shuffleArray(myLayers)
//         }
//         if (origin == true) {
//             var L = myLayers[0];
//             tilePos = -[L.sourceRectAtTime(0, false).width, L.sourceRectAtTime(0, false).height] / 2;
//         }
//         tileLayers(myLayers, h, v, myWidthLimit);
//     }
// }

palette.show();