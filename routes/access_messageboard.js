/*
access_messageboard.js needs to query the database for all the posts on the given messageboard

It then loads them onto the messageboard view.
*/
var db = require('../models')

module.exports = function(req, res) {
	// find the messageboard
	db.Messageboard.findOne({ '_id' : req.params.messageboard_id }, function(err, board) {
		if (err) throw err;

		// find the associated comments
		db.Comment.find({ 'messageboard' : req.params.messageboard_id }, function(err, posts) {
			if (err) throw err;

			res.render('messageboard.ejs', { title: board.name, messageboard_id : req.params.messageboard_id, posts : posts });
		});
	});
}