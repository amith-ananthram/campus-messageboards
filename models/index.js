/*
	Three main models required:
		1) User
			- name
			- password
			- date created
		2) Whiteboard
			- name
			- location (x, y)
			- created by whom
			- date created
			- list of users currently participating
			- list of comments
		3) Comment
			- comment text
			- user who created it
			- whiteboard its associated with
			- date & time of post
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
	name: { type: String, require: true },
	password: { type: Number, require: true },
	salt: { type: Number, require: true} 
	//date: { type: Date, require: true }
});

var whiteboardSchema = Schema({
	name: { type: String, require: true },
	x_coordinate: { type: Number, require: true },
	y_coordinate: { type: Number, require: true },
	//created_by: { type: Schema.Types.ObjectId, ref: 'User', require: true },
	//date: { type: Date, require: true },
	//current_users: [Schema.Types.ObjectId],
	//comments: [Schema.Types.ObjectId]
});

var commentSchema = Schema({
	text: { type: String, require: true },
	posted_by: { type: Schema.Types.ObjectId, ref: 'User', require: true },
	whiteboard: { type: Schema.Types.ObjectId, ref: 'Whiteboard', require: true },
	date: { type: Date, require: true }
});

module.exports = {
	User: mongoose.model('User', userSchema),
	Whiteboard: mongoose.model('Whiteboard', whiteboardSchema),
	Comment: mongoose.model('Comment', commentSchema)
}