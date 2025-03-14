/*
	ConSOLIDator
	©2015-2017 David Torno

	- Consolidates Nulls and Solids in project to reduce visual Project panel clutter and promote sanity.
*/

{
	function conSOLIDatorScript(){
		app.beginUndoGroup("conSOLIDate");
			/*Inital house cleaning*/
			clearUnusedSolidsNulls();
			var scriptName = "conSOLIDator";
			var version = "v1.0";
			var allSolidItems = collectSolidItems();
			var allSolidItemsLen = allSolidItems.length;
			var k = new Array("name", "width", "height", "par", "color", "idx");
			var key;
			if(allSolidItemsLen > 0){
				key = 4;/*Sort Object by color initially*/
				allSolidItems.sort(function(a, b){var atrA = a[k[key]];var atrB = b[k[key]];if(atrA < atrB){return -1;}if(atrA > atrB){return 1;}return 0;});

				/*Build progressbar window*/
				var pwpRes = "palette{orientation:'column', alignChildren:['fill', 'top'],\
					status: StaticText{text:'Processing...', alignment:['fill', 'center']},\
					progBar: Progressbar{minvalue:0, maxvalue:100, value:0, preferredSize:[300, -1]},\
				}";
				var pwpWin = new Window(pwpRes);
				pwpWin.text = scriptName + " " + version;
				var s = pwpWin.status;
				var p = pwpWin.progBar;
				pwpWin.layout.layout(true);
				pwpWin.center();			
				pwpWin.show();

				/*	GAME TIME! LET'S DO THIS!	*/
				consolidateDupSolids(allSolidItems, allSolidItemsLen, k);
				
				/*Final house cleaning*/
				clearUnusedSolidsNulls();
				
				/*Info panel feedback*/
				writeLn("conSOLIDate complete.");

				/*Show stats*/
				var totalSolidsFound = allSolidItemsLen;
				var totalSolidsRemaining = getSolidsCount();
				var coSOLIDatedPercent = 100-(totalSolidsRemaining/totalSolidsFound*100).toFixed(0);
				var praise = ["Not a single Solid was being used!", "Excellent!", "Pretty good!", "Not bad.", "Hmmm, your Solids are pretty unique, better luck next time."];
				if(coSOLIDatedPercent == 0){
					alert("Process complete.\r\rStats...\rStarting total: " + totalSolidsFound.toString() + "\rEnding total: " + totalSolidsRemaining.toString() + "\r\rYou conSOLIDated " + coSOLIDatedPercent.toString() + "% of the project Solid assets.\r\r" + praise[4]);
				}else if(coSOLIDatedPercent >=1 && coSOLIDatedPercent < 33){
					alert("Process complete.\r\rStats...\rStarting total: " + totalSolidsFound.toString() + "\rEnding total: " + totalSolidsRemaining.toString() +  "\r\rYou conSOLIDated " + coSOLIDatedPercent.toString() + "% of the project Solid assets.\r\r" + praise[3]);
				}else if(coSOLIDatedPercent >= 33 && coSOLIDatedPercent < 66){
					alert("Process complete.\r\rStats...\rStarting total: " + totalSolidsFound.toString() + "\rEnding total: " + totalSolidsRemaining.toString() +  "\r\rYou conSOLIDated " + coSOLIDatedPercent.toString() + "% of the project Solid assets.\r\r" + praise[2]);
				}else if(coSOLIDatedPercent >= 66 && coSOLIDatedPercent <= 99){
					alert("Process complete.\r\rStats...\rStarting total: " + totalSolidsFound.toString()+ "\rEnding total: " + totalSolidsRemaining.toString() +  "\r\rYou conSOLIDated " + coSOLIDatedPercent.toString() + "% of the project Solid assets.\r\r" + praise[1]);
				}else if(coSOLIDatedPercent == 100){
					alert("Process complete.\r\rStats...\rStarting total: " + totalSolidsFound.toString() + "\rEnding total: " + totalSolidsRemaining.toString() +  "\r\rYou conSOLIDated " + coSOLIDatedPercent.toString() + "% of the project Solid assets.\r\r" + praise[0]);
				}

				writeLn(coSOLIDatedPercent.toString() + "% conSOLIDated.");
								
				/*Finished using the progress window, close it*/
				pwpWin.close();
			}

		app.endUndoGroup();

		///FUNCTIONS

		function consolidateDupSolids(allSolidItems, allSolidItemsLen, keyOptions){
			var debug = new Array();
			var curSolid, prevSolid, w, h, p, c, i, k, parent, collect, collectLen, allLayers, allLayersLen, curComp, curLayer, processThisSolid;
			k = keyOptions;
			parent = allSolidItems[0];
			pwpWin.progBar.maxvalue = allSolidItemsLen;
			pwpWin.status.text = "Processing...";
			for(var s=1; s<allSolidItemsLen; s++){
				curSolid = allSolidItems[s];
				w = curSolid[k[1]].toString();	/*Width*/
				h = curSolid[k[2]].toString();	/*Height*/
				p = curSolid[k[3]].toString();	/*Par*/
				c = curSolid[k[4]].toString();	/*Color*/
				i = parseInt(curSolid[k[5]]);	/*Idx*/

				parW = parent[k[1]].toString();	/*Width*/
				parH = parent[k[2]].toString();	/*Height*/
				parP = parent[k[3]].toString();	/*Par*/
				parC = parent[k[4]].toString();	/*Color*/
				parI = parseInt(parent[k[5]]);	/*Idx*/

				if(c == parC){
					if(w == parW && h == parH && p == parP){
						/*
						//app.project.item(i).replace(app.project.item(parI), true);
						- .replace() only works with file objects, which SolidSource items do not have. GRRRRRR...
						- .replaceSource is only available with AVLayer objects. GRRRRRRR....
						
						Gotta do this the hard way and loop through the usedIn collection attribute, and compare SolidSource item ID's. :(

						There's probably a better way to grab layer sources first, then extract unique sources, then consolidate off of that, but I'm not dealing with that right now.
						*/
						processThisSolid = app.project.item(i);
						collect = processThisSolid.usedIn;	/*Get what comps this solid is used in...*/
						collectLen = collect.length;
						for(var u=0; u<collectLen; u++){	/*Loop through comps that were used...*/
							pwpWin.status.text = "Searching comps...";
							curComp = collect[u];
							allLayers = curComp.layers;
							allLayersLen = allLayers.length;
							for(var r=1; r<=allLayersLen; r++){ /*Loop through comp layers...*/
								curLayer = allLayers[r];
								if(curLayer instanceof AVLayer){/*Verify layer is an AVLayer object...*/
									if(curLayer.source.id.toString() == processThisSolid.id.toString()){/*Compare layer source item ID to main item ID to make sure they are the same...*/
										pwpWin.status.text = "conSOLIDating!";
										curLayer.replaceSource(app.project.item(parI), true);/*REPLACE IT!!!*/
									}
								}
							}
						}
					}else{
						parent = allSolidItems[s];
					}
				}else{
					parent = allSolidItems[s];
				}
				
				pwpWin.progBar.value++;

				/*Hack to show progress percentage on Windows machines. Ends up being extra data on macs.*/
				pwpWin.text = scriptName + " " + version + " ... " + (pwpWin.progBar.value/pwpWin.progBar.maxvalue*100).toFixed(0).toString() + "%";
			}
		}

		function collectSolidItems(){
			var proj, itemTotal, curItem, data, mSrc;
			data = new Array();
			proj = app.project;
			itemTotal = proj.numItems;
			for(var i=1; i<itemTotal; i++){
				curItem = proj.item(i);
				if(curItem instanceof FootageItem){/* Footage item */
					mSrc = curItem.mainSource;
					if(mSrc instanceof SolidSource){/* Solid item */
						data.push({'name':curItem.name, 'width':curItem.width , 'height':curItem.height , 'par':curItem.pixelAspect , 'color':mSrc.color , 'idx':i});
					}
				}
			}
			return data;
		}

		function clearUnusedSolidsNulls(){
			var proj, itemTotal, curItem;
			proj = app.project;
			itemTotal = proj.numItems;
			for(var i=itemTotal; i>=1; i--){
				curItem = proj.item(i);
				if(curItem.mainSource instanceof SolidSource && curItem.usedIn.length == 0){
					curItem.remove();
				}
			}
		}
		
		function getSolidsCount(){
			var proj, itemTotal, curItem, count;
			count = 0;
			proj = app.project;
			itemTotal = proj.numItems;
			for(var i=itemTotal; i>=1; i--){
				curItem = proj.item(i);
				if(curItem.mainSource instanceof SolidSource){
					count++
				}
			}
			return count;
		}
	
	}

	conSOLIDatorScript();
}