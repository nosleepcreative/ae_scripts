// this deletes all layers
for(var i = app.project.activeItem.numLayers; i>0; i--){
    app.project.activeItem.layer(i).remove();
} // Remove all layers


/* https://forums.creativecow.net/docs/forums/post.php?forumid=227&postid=31539&univpostid=31539&pview=t

Removing an indexed object changes the indices of all the downstream objects so run the loop backwards

*/
