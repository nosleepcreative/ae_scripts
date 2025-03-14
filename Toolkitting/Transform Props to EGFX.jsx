/*
Script Name: Add Checkbox Control and Essential Graphics Properties
Description: 
- This script automates the process of adding a Checkbox Control to selected layers in After Effects and linking it to the Opacity property. 
- The checkbox toggles the visibility of the layer by setting the Opacity to 0 or its original value.
- It also adds the Checkbox Control, Position, and Scale properties of the selected layers to the Essential Graphics panel for streamlined template creation and editing.

Author: Desmond Du
Website: 
- https://duitbetter.com
- https://github.com/nosleepcreative
- https://www.youtube.com/@NoSleepCreative

Version: 1.0 
Date: [DATE], 2024
Copyright(c) 2024 nosleepcreative (Desmond Du). All rights reserved

Use Case:
- Ideal for motion designers and template creators who frequently work with Essential Graphics in After Effects.
- Simplifies the process of adding and linking layer properties to Essential Graphics, saving time and ensuring consistency.

Also see:
- Adobe After Effects Scripting Guide for more insights on automating workflows.
- Tutorials on creating and optimizing motion graphics templates.

Change Log:
Version 1.0:
- Initial release of the script.
- Adds Checkbox Control to toggle layer visibility.
- Links Opacity to the Checkbox Control via expressions.
- Includes Position and Scale properties in Essential Graphics.

Future improvements:
- Add support for custom naming of Essential Graphics properties.
- Enable batch processing across multiple compositions.
- Provide user interface (UI) options for customizing which properties to include.
*/
function addMP(properties, comp, layerName) {
    properties.forEach(function (prop) {
        var target = (prop.propertyGroup(1).name === "Effects") ? prop.property(1) : prop;
        var prefixedName = layerName + " - " + prop.name; // Add the layer name as a prefix
        target.addToMotionGraphicsTemplateAs(comp, prefixedName);
    });
}

// Main Script Execution
(function () {
    var proj = app.project;
    if (!proj) {
        alert("Please open a project first.");
        return;
    }

    var comp = app.project.activeItem;
    if (!(comp && comp instanceof CompItem)) {
        alert("Please select a composition.");
        return;
    }

    var selectedLayers = comp.selectedLayers;
    if (selectedLayers.length === 0) {
        alert("Please select one or more layers.");
        return;
    }

    app.beginUndoGroup("Add Checkbox Control and Link to Essential Graphics");

   selectedLayers.reverse() // Reverse so it's in order

    for (var i = 0; i < selectedLayers.length; i++) {
        var layer = selectedLayers[i];

       

        // Add Checkbox Control for Visibility
        var checkboxControl = layer.property("ADBE Effect Parade").addProperty("ADBE Checkbox Control");
        checkboxControl.name = "Visiblilty";
        checkboxControl
        if (checkboxControl) {
            checkboxControl.property("ADBE Checkbox Control-0001").setValue(1);
        }
        // Link Checkbox to Opacity
        var opacityProp = layer.property("ADBE Transform Group").property("ADBE Opacity");
        var expression = "effect('" + checkboxControl.name + "')('Checkbox') == 1 ? value : 0;";
        opacityProp.expression = expression;

        // Add properties to Essential Graphics with layer name as prefix
        var essentialProps = [
            layer.property("ADBE Effect Parade").property("ADBE Checkbox Control"),
            layer.property("ADBE Transform Group").property("ADBE Position"),
            layer.property("ADBE Transform Group").property("ADBE Scale")
        ];
        
        // If the layer is a text layer, include Source Text
        if (layer.property("Source Text") !== null) {
            essentialProps.unshift(layer.property("Source Text"));
        }

        addMP(essentialProps.reverse(), comp, layer.name);
    }

    app.endUndoGroup();
})();
