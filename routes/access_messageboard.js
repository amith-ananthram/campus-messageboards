/*
access_messageboard.js finds the messageboard whose id is passed in with its parameters,
and renders all of the posts associated with that messageboard to the messageboard
template.
*/
var db = require('../models')

module.exports = function(req, res) {
	// find the messageboard
	db.Messageboard.findOne({ '_id' : req.params.messageboard_id }, function(err, board) {
		if (err) throw err;

		// find the associated posts
		db.Comment.find({ 'messageboard' : req.params.messageboard_id }, function(err, posts) {
			if (err) throw err;

			res.render('messageboard.ejs', { title: board.name, messageboard_id : req.params.messageboard_id, posts : posts });
		});
	});
}