var fitOption;

if (confirm("Fit by: Height? If not, click 'Cancel' for Width.")) {
    fitOption = "height";
    targetSize = prompt("What is the target height (px)?", 100);
} else {
    fitOption = "width";
    targetSize = prompt("What is the target width (px)?", 100);
}