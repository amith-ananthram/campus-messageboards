/*
make_post.js adds a post to the messageboard for the given user

It then reloads the messageboard view.
*/
var db = require('../models')

module.exports = function(req, res) {
	console.log("HERE");
	console.log(req);

	

	// find the messageboard
	//db.Messageboard.findOne({ '_id' : req.params.messageboard_id }, function(err, board) {
	//	if (err) throw err;


//		var post = new db.Comment({
//			text : 
//		});

//		var commentSchema = Schema({
//	text: { type: String, require: true },
//	posted_by: { type: Schema.Types.ObjectId, ref: 'User', require: true },
//	messageboard: { type: Schema.Types.ObjectId, ref: 'Messageboard', require: true },
//	date: { type: Date, require: true }
//});

		// find the associated comments
		//db.Comment.find({ 'messageboard' : req.params.messageboard_id }, function(err, posts) {
		//	res.render('messageboard.ejs', { title: board.name, messageboard_id : req.params.messageboard_id, posts : posts });
		//});
	//});
}