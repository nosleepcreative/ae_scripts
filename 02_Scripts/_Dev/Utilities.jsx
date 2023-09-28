

function findpath(){

    var path = app.project.file.fsName;
    var renderpath = app.project;
    var lastpath = app.project;


// scriptUI

    var dialog = new Window("dialog");
    dialog.text = "nsc_locator";
    dialog.preferredSize.width = 200;
    dialog.orientation = "column";
    dialog.alignChildren = ["center","top"];
    dialog.spacing = 10;
    dialog.margins = 16;

    // PANEL1
    // ======
    var panel1 = dialog.add("panel", undefined, undefined, {name: "panel1"});
        panel1.text = "Your AEP can be found here: ";
        panel1.orientation = "row";
        panel1.alignChildren = ["left","top"];
        panel1.spacing = 10;
        panel1.margins = 10;

    //var statictext1 = panel1.add("statictext", undefined, undefined, {name: "statictext1"});
        //statictext1.text = path;

    var edittext1 = panel1.add('edittext {properties: {name: "edittext1"}}');
        edittext1.text = path;

    var button1 = panel1.add("button", undefined, undefined, {name: "button1"});
        button1.text = "Copy to Clipboard";
        //button1.onClick()=

    var button2 = panel1.add("button", undefined, undefined, {name: "button2"});
        button2.text = "Reveal in Finder";
        button2.onClick()= Reveal




    // PANEL2
    // ======
    var panel2 = dialog.add("panel", undefined, undefined, {name: "panel2"});
        panel2.text = "Your render location is set to";
        panel2.orientation = "row";
        panel2.alignChildren = ["left","top"];
        panel2.spacing = 10;
        panel2.margins = 10;

    var statictext2 = panel2.add("statictext", undefined, undefined, {name: "statictext2"});
        statictext2.text = "StaticText";



    // PANEL3
    // ======
    var panel3 = dialog.add("panel", undefined, undefined, {name: "panel3"});
        panel3.text = "your last render is located at:";
        panel3.orientation = "row";
        panel3.alignChildren = ["left","top"];
        panel3.spacing = 10;
        panel3.margins = 10;

    var statictext3 = panel3.add("statictext", undefined, undefined, {name: "statictext3"});
        statictext3.text = "StaticText";

    var button3 = panel3.add("button", undefined, undefined, {name: "button3"});
        button3.text = "Button";

dialog.show();
    // ": \n" + renderpath
    //  \n" + lastpath

}

function Reveal(){
    app.executeCommand(app.findMenuCommandId("Reveal in Finder"));

}
findpath();
