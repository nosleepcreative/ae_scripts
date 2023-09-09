//
app.active.prok
app.project.item(index).layer(index).nullLayer
var myComp = app.project.activeItem;
var thisLayer = myComp.layer(1);

var myCounter =0;

//Loops
while (myCounter < 10)
    {
        var dupLayer= thisLayer.duplicate();
        dupLayer.rotation.setValue(45*myCounter);
        myCounter = myCounter +1;
    }


*/


app
