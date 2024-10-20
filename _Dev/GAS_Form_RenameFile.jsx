//  Google App Script 
// Reference:
//https://medium.com/@yashashreepatel/how-to-rename-google-forms-responses-in-the-google-drive-automatically-94f033d90b24






function myFunction() {
var form = FormApp.openById('Form_Id'); //DDD
var formResponses = form.getResponses();
var baseString = 'https://drive.google.com/file/d/';
var endString = '/view?usp=drivesdk';
  
var folder = DriveApp.getFolderById('Drive_Id');
var files = folder.getFiles();
 
  while (files.hasNext()) {
    var file = files.next();
    for (var i = 0; i < formResponses.length; i++) {
      var formResponse = formResponses[i];
      var itemResponses = formResponse.getItemResponses();
      var itemResponseFname = itemResponses[0];
      var itemResponseLname = itemResponses[1];
      var itemResponseID = itemResponses[2];
      var itemResponsePhoto = itemResponses[3];
      
      var photoID = itemResponsePhoto.getResponse();
      var newName = itemResponseFname.getResponse() + " " + itemResponseLname.getResponse() + " - " + itemResponseID.getResponse();
      var url = baseString + photoID + endString;
      var urlCheck = file.getUrl();
      if ( url == urlCheck) {
        var modName = newName + ".jpg";
        file.setName(modName);
      }
    }
  }