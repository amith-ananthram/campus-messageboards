/*
make_post.js adds a post to the messageboard for the given user

It then reloads the messageboard view.
*/
var db = require('../models')

module.exports = function(req, res) {
	// make sure there's a user logged in
	if ( req.user != undefined ) {
		// make sure there's content in the post
		if ( req.body.message != "" ) {
			// create a new post from the content
			var post = new db.Comment({
				text : req.body.message,
				posted_by_id : req.user._id,
				posted_by_name : req.user.name,
				messageboard : req.params.messageboard_id,
				date : new Date()
			});

			post.save();
		}
		// if not, tell them to include content
		else
			res.error("Nothing to post!");
	}
	// if not, tell them they have to be logged in
	else 
		res.error("Must be logged in to post!");

	// returns to the message board
	res.redirect('back');
}