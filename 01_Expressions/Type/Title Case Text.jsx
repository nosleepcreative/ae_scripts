function toTitleCase(str) {
    // Get the source text of the layer
    var sourceText = text.sourceText;
    
    // Use a regular expression to match each word in the text and convert the first letter to uppercase
    var titleCaseText = sourceText.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    
    // Return the modified text
    return titleCaseText;
  }
  
  // Call the toTitleCase function
  toTitleCase();
  