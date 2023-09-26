// template
var myComp = app.project.activeItem;
var myLayers = myComp.selectedLayers;


function renameSelectedLayers(str) {
    for (i = 0; i < myLayers.length; i++) {
        n = i + 1;
        if (str == '') {
            myLayers[i].name = n;
        } else {
            myLayers[i].name = str + n;
        }
    }
}
str = prompt("Affix string eg. layer_", "");
renameSelectedLayers(str);