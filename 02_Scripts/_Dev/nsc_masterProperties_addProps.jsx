//masterProperties_addProps_v1.jsx

myComp = app.project.activeItem;
myProps = myComp.selectedProperties;

function addMP(p) {
    for (i = 0; i < myProps.length; i++) {
        p = myProps[i] // get one property
        if (p.propertyGroup(1).name == "Effects") {
            fx = p.property(1);
            fx.addToMotionGraphicsTemplateAs(myComp, p.name)
        } else
            p.addToMotionGraphicsTemplateAs(myComp, p.name)
    }
}
app.beginUndoGroup("addMaster");
addMP(myProps);
