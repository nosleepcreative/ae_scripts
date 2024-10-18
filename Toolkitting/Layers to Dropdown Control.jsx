app.beginUndoGroup("Add Controls Null and Dropdown");

try {
    var comp = app.project.activeItem;
    if (comp && comp instanceof CompItem) {
        var prefixToRemove = prompt("Prefix to remove (blank if none):", "");
        var suffixToRemove = prompt("Suffix to remove (blank if none):", " icon.png");

        var dropdownItems = [];
        for (var i = 1; i <= comp.layers.length; i++) {
            var name = comp.layers[i].name;

            // Check and remove prefix
            if (prefixToRemove && name.indexOf(prefixToRemove) === 0) {
                name = name.substring(prefixToRemove.length);
            }

            // Check and remove suffix
            if (suffixToRemove && name.length >= suffixToRemove.length &&
                name.substring(name.length - suffixToRemove.length) === suffixToRemove) {
                name = name.substring(0, name.length - suffixToRemove.length);
            }

            dropdownItems.push(name);
        }

        var controlsNull = comp.layers.addShape();
        controlsNull.name = "Controls";
        controlsNull.guideLayer = true;
        controlsNull.label = 14;
        controlsNull.moveToEnd();
        
        // Create text layer for label
        var textLayer = comp.layers.addText("");
        textLayer.name = "Label";
        textLayer.property("Source Text").expression = 'n = thisComp.layer("Controls").effect("Dropdown Menu Control")("Menu"); thisComp.layer(n).name;'
        textLayer.moveToEnd();

        var dropdown = controlsNull.property("ADBE Effect Parade").addProperty("ADBE Dropdown Control");
        dropdown.property(1).setPropertyParameters(dropdownItems);

        for (var j = 1; j <= comp.layers.length-2; j++) {
            comp.layers[j].name = dropdownItems[j - 1]; // rename with correct array index
            comp.layers[j].property("Opacity").expression =
                'posterizeTime(0); thisComp.layer("Controls").effect("Dropdown Menu Control")("Menu") == ' + j + ' ? 100 : 0;';
        }

    } else {
        alert("Select a composition.");
    }
} catch (error) {
    alert("Error: " + error.toString());
} finally {
    app.endUndoGroup();
}
