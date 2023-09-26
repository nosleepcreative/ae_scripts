
// DIALOG
// ======
var activeComp = app.project.activeItem;
var dialog = new Window("dialog");
    dialog.text = "populateText";
    dialog.orientation = "column";
    dialog.alignChildren = ["center","top"];
    dialog.spacing = 10;
    dialog.margins = 16;

var statictext1 = dialog.add("group");
    statictext1.orientation = "column";
    statictext1.alignChildren = ["left","center"];
    statictext1.spacing = 0;

    statictext1.add("statictext", undefined, "Insert your text below. ", {name: "statictext1"});
    statictext1.add("statictext", undefined, "Each line will be a new text layer", {name: "statictext1"});

var edittext1 = dialog.add('edittext {properties: {name: "edittext1", multiline: true, scrollable: true}}');
    edittext1.text = "Line 1\nLine 2 \nLine 3\nLine 4\nLine 5";
    edittext1.preferredSize.width = 200;
    edittext1.preferredSize.height = 200;
    edittext1.alignment = ["center","top"];


// DIALOG
// ======
var group1 = dialog.add("group", undefined, {name: "group1"});
    group1.orientation = "row";
    group1.alignChildren = ["left","center"];
    group1.spacing = 10;
    group1.margins = 0;

var button0 = group1.add("button", undefined, undefined, {name: "button0"});
    button0.text = "Create text layers";
    button0.alignment = ["left","top"];
    button0.onClick = readwrite;

var button1 = group1.add("button", undefined, undefined, {name: "button1"});
    button1.text = "?";
    button1.onClick =help;


var radiobutton1 = dialog.add("radiobutton", undefined, undefined, {name: "radiobutton1"});
    radiobutton1.text = "Align Left";
    radiobutton1.value = 1;
    radiobutton1.alignment = ["left","top"];

var radiobutton2 = dialog.add("radiobutton", undefined, undefined, {name: "radiobutton2"});
    radiobutton2.text = "Align Center";
    radiobutton2.alignment = ["left","top"];



dialog.show();


// problem is active item
function readwrite(){
    app.beginUndoGroup("readwrite") ;
    var comp = app.project.activeItem;
    var content = edittext1.text // read content
    var itemsArray = content.split(/\n|\r/);
    var myText,offset;
    var centerX ;


    for(var i=0; i < itemsArray.length; i++){
        //skip blanks
        if(itemsArray[i]!=''){
            myText = comp.layers.addText(itemsArray[i]);
            offset =  0+i*75+100;

                // Alignment Center
                if(radiobutton2.value==1){
                    //app.executeCommand(app.findMenuCommandId("Center Anchor Point in Layer Content"));
                    myText.property("Position").setValue([comp.width/2,offset]);

                } else{
                    myText.property("Position").setValue([0, offset]); //set position topright
                }


        }

    } dialog.close()
}




function help(){
    alert('Created by Desmond Du \n 03 Dec 2019')
}
