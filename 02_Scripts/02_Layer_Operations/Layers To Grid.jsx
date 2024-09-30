var panelGlobal = this;

/*
Code for Import https://scriptui.joonas.me — (Triple click to select):
[... shortened for brevity ...]
*/

// Function to build the UI
function buildUI(thisObj) {
    var dialog = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Layers To Grid", undefined, {resizeable: true});

    dialog.orientation = "column"; 
    dialog.alignChildren = ["left","top"]; 
    dialog.spacing = 10; 
    dialog.margins = 16; 

    // GROUP1
    var group1 = dialog.add("group", undefined, {name: "group1"}); 
    group1.orientation = "row"; 
    group1.alignChildren = ["left","center"]; 
    group1.spacing = 10; 
    group1.margins = 0; 

    // GROUP2: Rows and Columns Controls
    var group2 = group1.add("group", undefined, {name: "group2"}); 
    group2.orientation = "column"; 
    group2.alignChildren = ["left","top"]; 
    group2.spacing = 10; 
    group2.margins = 0; 

    var group3 = group2.add("group", undefined, {name: "group3"}); 
    group3.orientation = "row"; 
    group3.alignChildren = ["left","center"]; 
    group3.spacing = 10; 
    group3.margins = 0; 

    var edittextRows = group3.add('edittext {properties: {name: "edittextRows"}}'); 
    edittextRows.text = "10"; 
    edittextRows.preferredSize.width = 60; 
    var statictextRows = group3.add("statictext", undefined, "Rows"); 

    var group4 = group2.add("group", undefined, {name: "group4"}); 
    group4.orientation = "row"; 
    group4.alignChildren = ["left","center"]; 
    group4.spacing = 10; 
    group4.margins = 0; 

    var edittextCols = group4.add('edittext {properties: {name: "edittextCols"}}'); 
    edittextCols.text = "10"; 
    edittextCols.preferredSize.width = 60; 
    var statictextCols = group4.add("statictext", undefined, "Columns"); 

    // GROUP5: Spacing Controls
    var group5 = group1.add("group", undefined, {name: "group5"}); 
    group5.orientation = "column"; 
    group5.alignChildren = ["left","top"]; 
    group5.spacing = 10; 
    group5.margins = 0; 

    var group6 = group5.add("group", undefined, {name: "group6"}); 
    group6.orientation = "row"; 
    group6.alignChildren = ["left","center"]; 
    group6.spacing = 10; 
    group6.margins = 0; 

    var edittextXSpacing = group6.add('edittext {properties: {name: "edittextXSpacing"}}'); 
    edittextXSpacing.text = "100"; 
    var statictextXSpacing = group6.add("statictext", undefined, "X spacing"); 

    var group7 = group5.add("group", undefined, {name: "group7"}); 
    group7.orientation = "row"; 
    group7.alignChildren = ["left","center"]; 
    group7.spacing = 10; 
    group7.margins = 0; 

    var edittextYSpacing = group7.add('edittext {properties: {name: "edittextYSpacing"}}'); 
    edittextYSpacing.text = "100"; 
    var statictextYSpacing = group7.add("statictext", undefined, "Y spacing"); 

    // GROUP8: Shuffle Checkbox and Grid Buttons
    var group8 = dialog.add("group", undefined, {name: "group8"}); 
    group8.orientation = "row"; 
    group8.alignChildren = ["left","center"]; 
    group8.spacing = 10; 
    group8.margins = 0; 
    group8.alignment = ["center","top"]; 

    var checkboxShuffle = group8.add("checkbox", undefined, "Shuffle layers");

    // Add image strings for Grid and Staggered Grid buttons
    var Grid_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1A%00%00%00%1A%08%06%00%00%00%C2%A9JL%C3%8E%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%C3%92%C3%9D~%C3%BC%00%00%00%C2%82IDATH%C2%89c%C3%BC%C3%BF%C3%BF%3F%03%3D%00%13%5Dla%60%60%60%C2%81%C2%B3%C2%B2%7D%C2%B1y%C3%AD%03%C3%83%C3%94%C3%8D%C2%82P%C3%B9%C3%B7%0C%0C%0C%02%24%C3%8A30L%C3%9D%C3%8C%C3%88%C3%80%40G%1F%C2%8DZD6%60Ab%7F%C3%80%22%C3%BF%00%C2%8D%C2%AD%40%C2%A2%3C%1C0%0E%C3%AB%7C%C3%B4%1E%C2%8B%C3%BC%03%C2%86%C2%A9%C2%9B%0D%C2%A1%C3%B2%C3%A7%19%C2%B0%05%1D~y%06X%3EC%C2%8E%23%C3%8C%C3%8C%C2%86%C2%AAQ%01%C2%8B%1AB%C3%B2p0%C3%BC%C2%92%C3%B7h%3E%22%1B%C2%8C%C3%A6%C2%A3%C3%91%7C4%C2%8C-%1A~%C3%B9%08%00%C2%B1%C3%BB7%C3%B3%C2%84%C3%99%C3%9D%C2%AB%00%00%00%00IEND%C2%AEB%60%C2%82"; 
    var Grid = group8.add("iconbutton", undefined, File.decode(Grid_imgString), {name: "Grid", style: "toolbutton"}); 
    Grid.preferredSize.width = 30; 
    Grid.preferredSize.height = 30; 

    var StaggeredGrid_imgString = "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1A%00%00%00%1A%08%06%00%00%00%C2%A9JL%C3%8E%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%C3%92%C3%9D~%C3%BC%00%00%00%C2%92IDATH%C2%89c%C3%BC%C3%BF%C3%BF%3F%03%3D%00%13%5Dla%60%60%60%C2%81%C2%B3%C2%B2%7D%C2%B1y%C3%AD%20%C3%83%C3%94%C3%8D%0EP%C3%B9%03%0C%0C%0C%C3%B6%24%C3%8A30L%C3%9D%C3%8C%C3%88%C3%80%40G%1F%C2%8DZD6%60Ab%1F%C3%84%22%7F%01%07%C2%9BXy8%60%1C%C3%86%C3%B9%08%1D%40%C3%B2%05%3A%C2%B8%C3%800us%01T~%02%03%03%C2%83%01%C2%86%0AX%C2%BE%22%C3%9A%22l%C2%99%0F%15%18%10%C2%A1%06%0E%C2%86_%C3%B2%1E%04%C2%89%C2%81%C2%BC%7C%C2%85%13%0C%C3%A7%7CD%5E%C2%BE!%3A_!%C3%87%11%C2%A5%C3%B9%06%C2%AF%C3%BC%C3%B0K%C3%9E%C3%83%C3%8F%C2%A2%C3%A1%C2%97%C2%8F%00%0D%C3%851%60%C2%89v%0C%5C%00%00%00%00IEND%C2%AEB%60%C2%82"; 
    var StaggeredGrid = group8.add("iconbutton", undefined, File.decode(StaggeredGrid_imgString), {name: "StaggeredGrid", style: "toolbutton"}); 
    StaggeredGrid.preferredSize.width = 30; 
    StaggeredGrid.preferredSize.height = 30; 

    // Add resizing support
    dialog.onResizing = dialog.onResize = function () { 
        this.layout.resize();
    }

    // Function to shuffle an array
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    // Grid Arrangement Function
    function arrangeInGrid(staggered) {
        var comp = app.project.activeItem;
        if (!(comp instanceof CompItem)) {
            alert("Please select a composition.");
            return;
        }

        var selectedLayers = comp.selectedLayers;
        if (selectedLayers.length === 0) {
            alert("Please select some layers.");
            return;
        }

        var xSpacing = parseFloat(edittextXSpacing.text);
        var ySpacing = parseFloat(edittextYSpacing.text);
        var rows = parseInt(edittextRows.text, 10);
        var columns = parseInt(edittextCols.text, 10);

        if (isNaN(xSpacing) || isNaN(ySpacing) || isNaN(rows) || isNaN(columns)) {
            alert("Please enter valid numeric values.");
            return;
        }

        if (checkboxShuffle.value) {
            shuffleArray(selectedLayers);
        }

        // Calculate center offset to position the grid in the middle of the composition
        var totalGridWidth = (columns - 1) * xSpacing;
        var totalGridHeight = (rows - 1) * ySpacing;
        var centerX = comp.width / 2 - totalGridWidth / 2;
        var centerY = comp.height / 2 - totalGridHeight / 2;

        var layerIndex = 0;

        for (var row = 0; row < rows; row++) {
            for (var col = 0; col < columns; col++) {
                if (layerIndex >= selectedLayers.length) break;

                var layer = selectedLayers[layerIndex];
                var newX = centerX + col * xSpacing;
                var newY = centerY + row * ySpacing;

                // Apply staggered offset
                if (staggered && row % 2 !== 0) {
                    newX += xSpacing / 2;
                }

                layer.property("Position").setValue([newX, newY]);
                layerIndex++;
            }
        }

        if (layerIndex < selectedLayers.length) {
            alert("Not all layers could be placed within the grid. Increase the grid size or reduce the number of layers.");
        }
    }

    // Event Listeners for Buttons
    Grid.onClick = function() {
        arrangeInGrid(false);
    };

    StaggeredGrid.onClick = function() {
        arrangeInGrid(true);
    };

    if (dialog instanceof Window) {
        dialog.center();
        dialog.show();
    }

    return dialog;
}

// Initialize the UI
var panelGlobal = buildUI(this);

// Dockable Panel
if (panelGlobal instanceof Panel) {
    panelGlobal.layout.layout(true);
}
