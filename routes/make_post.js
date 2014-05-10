/*
make_post.js adds a post to the messageboard for the given user

It then reloads the messageboard view.
*/
var db = require('../models')

module.exports = function(req, res) {
	if ( req.user != undefined ) {
		var post = new db.Comment({
		text : req.body.message,
		posted_by_id : req.user._id,
		posted_by_name : req.user.name,
		messageboard : req.params.messageboard_id,
		date : new Date()
		});

		post.save();
	};

	res.redirect('/messageboards/' + req.params.messageboard_id);
}