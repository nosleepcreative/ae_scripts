var proj = app.project;

var selection = proj.selection;

for (var i = 0; i < selection.length; i++)

          {

                // Get a list of comps that the footage is being used in

                var compsUsedIn = selection.usedIn;

                // Creates comp based on selected footage settings

                var newComp = proj.items.addComp(selection.name, selection.width, selection.height, selection.pixelAspect, selection.duration, selection.frameRate);

 

                // Add footage to the new comp

      newComp.layers.add(selection);

                // Loops through the used comps

                for (var x = 0; x < compsUsedIn.length; x++)

                     {

                               var layersInComp = compsUsedIn.numLayers;

               // Loop through the layers in each used comp

                              for (var y = 1; y <= layersInComp; y++)

                                   {

                                             // Replaces matching instances with the new comp

                                             if (compsUsedIn.layer(y).source == selection) {

                                                       compsUsedIn.layer(y).replaceSource(newComp, true);

                                        }

                              }

                    }

          }