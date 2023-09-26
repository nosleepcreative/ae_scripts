var comp = app.project.activeItem;
var myNull = comp.layers.addNull();
myNull.name = "colors";
myNull.label = 9;

for (i = 1; i <= 10; i++) {
    addSlider(i);
}

function addSlider(fxName) {
    efx = myNull.property("Effects").addProperty("Color Control");
    efx.name = fxName.toString(); // numbered
}
