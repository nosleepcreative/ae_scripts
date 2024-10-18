// RenderFrameAtMarkers.jsx
// ©September 2008  Lloyd Alvarez  http://aescripts.com
//
// Does a  "Save Frame As" anywhere there is a marker on a designated marker layer
//
//  Unfortunately comp markers are not available through scripting, 
// so you need to place the markers where you would like a frame rendered on a layer.  
// It can be any layer you want, just tell the script which layer has the markers when it's first run.
// 
//
// 1.92 Added error suppress dialog to fix CC2014 bug 01/2015
// 1.91 Fixed UI in windows CS5 03/2011
// 1.9 Added padding to numbers 12/2010
// 1.8 Fixed output directory bug, CS5 compatible 08/2010
// 1.71 Fixed layer name bug 06/2010
// 1.7 Added marker comment and comp name in file name option 11/2009
// 1.6 Fixed select output folder if cancel bug, Removed RQ queued item check 11/2009
// 1.5 Added new smarter interface options 10/2009
// 1.3 fixed mac output filename bug 08/2009
// 1.2 added numbering option 07/2009
// 1.1 changed to work within workarea only 01/2009
// 1.01 bug fixes 09/2008
// 1.0 Initial Release 09/2008


	function warningDialog() // this function draws the dialog box
			{
				this.windowRef = null;
			}

			warningDialog.prototype.run = function()
			{

			if ($.os.indexOf("Windows") != -1 && parseFloat(app.version) < 10) { // Windows adjust
						var winAdjust = -20;
						var renderBtn = "Queue";
						} else {
							var winAdjust = 0;
							var renderBtn = "Queue"; //was Render
							}
					
					
				var instructions = "Instructions:\n\n" +
										"Choose any layer in your comp and place layer markers where you would like frames from the comp rendered.  " +
										"Unfortunately comp markers are not supported.\n\n" +
										"To place a marker on a layer, first select the layer and then choose Add Marker from the layer menu.\n\n" +
										"Once you've placed the layer markers, run the script and choose the layer " +
										"with the markers from the drop down list below.\n\n" +
										"Select the Render Settings, " +
										"Output Module and Output Folder and hit " + renderBtn + ".\n\n" +
										"©2008-2015   http://aescripts.com";

		
					
				var win = new Window("dialog", "Render Frame At Markers" ,[100,100,390,580 + winAdjust]);  // bounds = [left, top, right, bottom]
				this.windowRef = win;
				var pushDown = 220;
				var pushDown2 = 95  + winAdjust;
				
				win.btnPanel = win.add("group", [10,5,410,580]);
				//win.btnPanel.instr = win.add("panel", [20,5,260,205],"Instructions:");
				win.btnPanel.instr = win.btnPanel.add("edittext", [5,10,260,200], instructions, {multiline:true});
				win.btnPanel.text = win.btnPanel.add("statictext", [10,pushDown+5,260,pushDown+30], "Please choose the layer that has the markers");
				win.btnPanel.list = win.btnPanel.add("dropdownlist", [10,pushDown+25,260,pushDown+50]);
				win.btnPanel.RStxt = win.btnPanel.add("statictext", [10,pushDown+58,95,pushDown+85],"Render Settings:");
				win.btnPanel.RSlist = win.btnPanel.add("dropdownlist", [100,pushDown+55,260,pushDown+80]);
				win.btnPanel.OMtxt = win.btnPanel.add("statictext", [10,pushDown+83,95,pushDown+110],"Output Module:");
				win.btnPanel.OMlist = win.btnPanel.add("dropdownlist", [100,pushDown+80,260,pushDown+105]);
				win.btnPanel.dirtxt = win.btnPanel.add("statictext", [10,pushDown+113,95,pushDown+130],"Output Folder:");
				win.btnPanel.dirBtn = win.btnPanel.add("button", [100,pushDown+110,260,pushDown+130], "Browse");
				win.btnPanel.dirOutputtxt = win.btnPanel.add("statictext", [10,pushDown+140,260,pushDown+160],"This is a very long string, so long I dont know what to do now");
				win.btnPanel.padNumsCheck = win.btnPanel.add("checkbox", [10,pushDown+170,150,pushDown+190],"Pad Marker Numbers");
				win.btnPanel.padNums = win.btnPanel.add("edittext", [150,pushDown+170,205,pushDown+190],"4");
				win.btnPanel.padNumsTxt = win.btnPanel.add("statictext", [210,pushDown+170,260,pushDown+190],"digits");
				win.btnPanel.useTxt = win.btnPanel.add("statictext", [10,pushDown  + pushDown2+100,55,pushDown + pushDown2 + 120], "Include:");
				win.btnPanel.useComment = win.btnPanel.add("checkbox", [55,pushDown  + pushDown2+100,180,pushDown + pushDown2 + 120], "Marker comment");
				win.btnPanel.useCompName = win.btnPanel.add("checkbox", [170,pushDown  + pushDown2+100,260,pushDown + pushDown2 + 120], "Comp name");
				win.btnPanel.cancelBtn = win.btnPanel.add("button", [10,pushDown + pushDown2+125,120,pushDown + pushDown2+145], "Cancel");
				win.btnPanel.okBtn = win.btnPanel.add("button", [130, pushDown + pushDown2+125,260, pushDown + pushDown2+145], renderBtn);
				
				// Get the list of render settings and output module templates, this function // Copyright (c) 2006-2008 redefinery (Jeffrey R. Almasol). All rights reserved.   www.redefinery.com
				// (Need to add a dummy comp to the render queue to do this)
				var rqi = app.project.renderQueue.items.add(myComp);
				var om = rqi.outputModule(1);								// Assumes at least one output module
			
				for (var i=0; i<rqi.templates.length; i++)
					if (rqi.templates[i].indexOf("_HIDDEN") != 0)			// Don't add hidden templates
						win.btnPanel.RSlist.add("item", rqi.templates[i]);
						
				if (om.templates.length > 0) {
					if (app.settings.haveSetting("aescripts", "RenderFrameAtMarkers_RS_Selection")) {
						var RS_pref = app.settings.getSetting("aescripts", "RenderFrameAtMarkers_RS_Selection");
						if (RS_pref < om.templates.length) {
									win.btnPanel.RSlist.selection = RS_pref;
									} else {
										win.btnPanel.RSlist.selection = 0;
										}
						} else {
					win.btnPanel.RSlist.selection = 0;  // Select the first template in the list, if there is at least one
					}
				}
					
				for (var i=0; i<om.templates.length; i++)
					if (om.templates[i].indexOf("_HIDDEN") != 0)			// Don't add hidden templates
						win.btnPanel.OMlist.add("item", om.templates[i]);
				if (om.templates.length > 0) {
							if (app.settings.haveSetting("aescripts", "RenderFrameAtMarkers_OM_Selection")) {
						var OM_pref = app.settings.getSetting("aescripts", "RenderFrameAtMarkers_OM_Selection");
						if (OM_pref < om.templates.length) {
									win.btnPanel.OMlist.selection = OM_pref;
									} else {
										win.btnPanel.OMlist.selection = 0;
										}
						} else {
					win.btnPanel.OMlist.selection = 0;  // Select the first template in the list, if there is at least one
					}
				}
			
				rqi.remove();												// Remove the temp render queue item
				
				var dialogOutput = new Array();
				
				var defaultFolder = Folder.desktop;
				if (app.settings.haveSetting("aescripts", "RenderFrameAtMarkers_defaultFolder")) {
					var outFolderFsName = app.settings.getSetting("aescripts", "RenderFrameAtMarkers_defaultFolder");
					var outFolder  = new Folder ( outFolderFsName );
						} else {
					var outFolder = defaultFolder ;
				}
				
				var outFolderName = outFolder.fsName
				if (outFolderName.length > 35 ) {
					win.btnPanel.dirOutputtxt.text = "..." + outFolderName.substring(outFolderName.length-35,outFolderName.length);
					} else {
						win.btnPanel.dirOutputtxt.text = outFolderName;
						}
				dialogOutput[4] = outFolder;
				
				win.btnPanel.dirBtn.onClick = function ()
				{
					//defaultFolder = Folder.desktop;
					/*if ($.os.indexOf("Windows") != -1)				// On Windows, escape backslashes first
						defaultFolder = defaultFolder.replace("\\", "\\\\");
					*/
					var newOutFolder = Folder.selectDialog ("Output Folder", outFolder);
					if (newOutFolder) {
						outFolderName = newOutFolder.fsName;
						outFolder = newOutFolder;
						}
					if (outFolderName.length > 35 ) {
					win.btnPanel.dirOutputtxt.text = "..." + outFolderName.substring(outFolderName.length-35,outFolderName.length);
					} else {
						win.btnPanel.dirOutputtxt.text = outFolderName;
						}
					app.settings.saveSetting("aescripts", "RenderFrameAtMarkers_defaultFolder", outFolder.fsName);
					dialogOutput[4] = outFolder;
					
				}
				
				for (i=1; i<=compLayers.length;i++){
					win.btnPanel.list.add("item",compLayers[i].index + ". " +compLayers[i].name);
						}
			
				var myLayer = win.btnPanel.list;
				myLayer.selection = 0;
				dialogOutput[0] = myLayer.selection.index;


				win.btnPanel.list.onChange = function() {
					dialogOutput[0] = myLayer.selection.index;
					}
				
				dialogOutput[1] = 0;
				win.btnPanel.cancelBtn.onClick = function() {
					dialogOutput[1] = 0;
					win.close();
				};
				win.btnPanel.okBtn.onClick = function() {
					dialogOutput[1] = 1;
					win.close();
				};
	
				dialogOutput[2] = win.btnPanel.RSlist.selection;
				
				win.btnPanel.RSlist.onChange = function() {
					dialogOutput[2] = win.btnPanel.RSlist.selection;
					app.settings.saveSetting("aescripts", "RenderFrameAtMarkers_RS_Selection", win.btnPanel.RSlist.selection.index);
					}
		
				dialogOutput[3] = win.btnPanel.OMlist.selection;
				
				win.btnPanel.OMlist.onChange = function() {
					dialogOutput[3] = win.btnPanel.OMlist.selection;
					app.settings.saveSetting("aescripts", "RenderFrameAtMarkers_OM_Selection", win.btnPanel.OMlist.selection.index);
					}
				
				win.btnPanel.useComment.value = true;
				dialogOutput[5] =  win.btnPanel.useComment.value;
				if (app.settings.haveSetting("aescripts", "RenderFrameAtMarkers_useComment")) {
					win.btnPanel.useComment.value = !(app.settings.getSetting("aescripts", "RenderFrameAtMarkers_useComment") == "false");
						} else {
					win.btnPanel.useComment.value = true;	
							}
				dialogOutput[5] =  win.btnPanel.useComment.value;
			
				win.btnPanel.useComment.onClick = function() {
					dialogOutput[5] =  this.value;
					app.settings.saveSetting("aescripts", "RenderFrameAtMarkers_useComment", this.value);
				}
				
				win.btnPanel.useCompName.value = true;
				dialogOutput[6] =  win.btnPanel.useCompName.value;
				if (app.settings.haveSetting("aescripts", "RenderFrameAtMarkers_useCompName")) {
					win.btnPanel.useCompName.value = !(app.settings.getSetting("aescripts", "RenderFrameAtMarkers_useCompName") == "false");
						} else {
					win.btnPanel.useCompName.value = true;		
							}
			dialogOutput[6] =  win.btnPanel.useCompName.value;
			
				win.btnPanel.useCompName.onClick = function() {
					dialogOutput[6] =  this.value;
					app.settings.saveSetting("aescripts", "RenderFrameAtMarkers_useCompName", this.value);
				}
			win.btnPanel.padNumsCheck.value = true;
				dialogOutput[7] =  win.btnPanel.padNumsCheck.value;
				if (app.settings.haveSetting("aescripts", "RenderFrameAtMarkers_padNumsCheck")) {
					win.btnPanel.padNumsCheck.value = !(app.settings.getSetting("aescripts", "RenderFrameAtMarkers_padNumsCheck") == "false");
						} else {
					win.btnPanel.padNumsCheck.value = true;		
							}
			dialogOutput[7] =  win.btnPanel.padNumsCheck.value;
			
				win.btnPanel.padNumsCheck.onClick = function() {
					dialogOutput[7] =  this.value;
					app.settings.saveSetting("aescripts", "RenderFrameAtMarkers_padNumsCheck", this.value);
				}
			
			win.btnPanel.padNums.text = 4;
				dialogOutput[8] =  win.btnPanel.padNums.text;
				if (app.settings.haveSetting("aescripts", "RenderFrameAtMarkers_padNums")) {
					win.btnPanel.padNums.text = app.settings.getSetting("aescripts", "RenderFrameAtMarkers_padNums");
						} else {
					win.btnPanel.padNums.text = true;		
							}
			dialogOutput[8] =  win.btnPanel.padNums.text;
			
				win.btnPanel.padNums.onChange = function() {
					dialogOutput[8] =  this.text;
					app.settings.saveSetting("aescripts", "RenderFrameAtMarkers_padNums", this.text);
				}
			
				// Display the window
				win.center();
				win.show();
				
				return dialogOutput;		
			}
function PadDigits(n, totalDigits) 
    { 
        n = n.toString(); 
        var pd = ""; 
        if (totalDigits > n.length) 
        { 
            for (m=0; m < (totalDigits-n.length); m++) 
            { 
                pd += "0"; 
            } 
        } 
        return pd + n.toString(); //return padded number
		//return pd;  //return only pad without number
    } 


var proj = app.project;
	var undoStr = "Render Frame At Markers";

	if (proj){
		var myComp = app.project.activeItem;
		if (myComp != null && (myComp instanceof CompItem)){

			var compLayers = myComp.layers;
			
			if (compLayers.length != 0) {
			
		var existingRQ = proj.renderQueue.numItems;
		var queuedItems = 0;
		var unQ = false;
		var askToUnQ = false;
		for (a = 1; a <= existingRQ; a++) {
		var curItem = proj.renderQueue.item(a);
			if (curItem.status == RQItemStatus.QUEUED) {
				if (askToUnQ) {
				unQ = confirm ("You currently have items queued in your render queue\nThis script will render all queued items, would you like to unqueue these items before proceeding?");
				}
				askToUnQ = false;
				if (unQ) {
					curItem.render = false;
					}
				}	 // if QUEUED
			} // close for a loop

			if(typeof(warningDialog_unitTest) == "undefined") {

				 var dialogOutput =  new warningDialog().run();
				 
				if (dialogOutput[1] == 1) {
					
				app.beginUndoGroup(undoStr);
                  app.beginSuppressDialogs() ;
				 var markerLayer = dialogOutput[0] + 1;
				 var myMarker = compLayers[markerLayer].property("Marker");
				 if (myMarker.numKeys > 0) {
					 var myTimes = new Array();
					 var myComments = new Array()
					 var t=0;
				for (m=1; m<=myMarker.numKeys; m++) {
					myTimes[t] = myMarker.keyTime(m);
					myComments[t] = myMarker.keyValue(m).comment;
							t++;
				}
				
				
				var namesArray = new Array();
			// this section adds the items to the render queue properly but there is a bug in the naming where AE seems to add the frame number at the end of the file name automatically
				
				var n=0
				while (n<myTimes.length){
						var myRQItem = proj.renderQueue.items.add(myComp); 
						myRQItem.applyTemplate(dialogOutput[2]);
						myRQItem.outputModules[1].applyTemplate(dialogOutput[3]);
						myRQItem.timeSpanStart = myTimes[n];
						myRQItem.timeSpanDuration = 1*myComp.frameDuration;
						//var myPath = myRQItem.outputModules[1].file.path;
						var myPath = dialogOutput[4];
						
						//alert(proj.renderQueue.numItems);
						 
						var useComment =  (dialogOutput[5]) ? myComments[n] + "_" : "";
						var useCompName =  (dialogOutput[6]) ? myComp.name + "_" : "";
						var renderedFile  = new File (myPath.fsName + "/" + useCompName + useComment + ((dialogOutput[7]) ? PadDigits((n+1),parseFloat(dialogOutput[8])) : (n+1)) + "_[#####].[fileExtension]");
				 
						myRQItem.outputModules[1].file = renderedFile;
				/*		
						var renderQueueName = unescape(myRQItem.outputModules[1].file);
						var extension = renderQueueName.substring(renderQueueName.lastIndexOf(".",renderQueueName.length));
						//var renderName = renderedFile.fsName +"_" + n + "_" + extension;
									
						var actualNameFile = new File (myPath.fsName + "/" + myComp.name + "_" + (n+1) + "_" + PadDigits(myTimes[n] * myComp.frameRate,5) + extension);
						//alert (actualNameFile);
						var actualFileCheck = new File (myPath.fsName + "/" + myComp.name + numbering + extension);
						var myNewName = myComp.name + numbering + extension;
						//alert(actualFileCheck);
						if ($.os.indexOf("Mac") != -1) {
							if (actualFileCheck.exists) {
							alert (myNewName + " already exists\nThis script is unable to overwrite files.  Please move or delete this file and re-run the script.");
							myRQItem.remove();
								for (var k=0; k<namesArray.length; k++) {
								proj.renderQueue.item(namesArray[k][2]).remove();
								}
							n = myTimes.length;
							}
						}     // close if mac
				 */
							//add the names to an array
						//namesArray[namesArray.length] = [actualNameFile, myNewName,proj.renderQueue.numItems, actualFileCheck];
						n++;
						} //close for n loop
				/*		
		if ($.os.indexOf("Mac") != -1) {  // on mac we need to render and rename the file due to an confirmed AE bug				
					//render the queue
				proj.renderQueue.render();

//rename the files	
				for (var j=0; j < namesArray.length; j++) {
			
					if (namesArray[j][0].exists) {
						namesArray[j][0].rename(namesArray[j][1]);
						} 
					
				} // close for j loop
			
				for (var k=0; k<namesArray.length; k++) {
					proj.renderQueue.item(namesArray[k][2]).file = namesArray[k][3];
					}
			}  // close if Mac
		*/
                  app.endSuppressDialogs(true);
				app.endUndoGroup();	
				
								} else { //	 if (myMarker.numKeys > 0)
									alert("The layer you selected does not contain any markers.");
									}
								}
					} // close run dialog				
			
				} else { //	if (compLayers.length != 0) 
			alert("The selected comp does not have any layers");
		}
			
		} else { //if (myComp != null && (myComp instanceof CompItem))
			alert("Please select the comp first");
		}
	}
	else
	{
		alert("Please open a project first to use this script.");
	}
