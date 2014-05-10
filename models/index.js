/*
	This file defines the three object models we'll be using and
	their relevant parameters.

	Three main models required:
		1) User
			- name
			- password
			- date created
		2) Messageboard
			- name
			- location (x, y)
			- created by whom
			- date created
		3) Comment
			- comment text
			- user who created it
			- messageboard its associated with
			- date & time of post
*/

/*
	Mongoose schema are object models for the underlying mongodb.
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
	bcrypt allows easy hashing & salting of user passwords to prevent
	things like rainbow table attacks
*/
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var userSchema = Schema({
	name: { type: String, require: true },
	password: { type: String, require: true },
	date: { type: Date, require: true }
});

// middleware that automatically hashes the password
// before it's saved
userSchema.pre('save', function(next) {
	var user = this;

	// only hash the pass if it's been modified/it's new
	if (!user.isModified('password')) return next();

	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) return next(err);

		// hash the password along w our new salt
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);

			// override the understandable password with its hash
			user.password = hash;
			next();
		})
	})
});

// a function that compares an inputted password
// to a saved password, using the appropriate salt, etc
userSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

var messageboardSchema = Schema({
	name: { type: String, require: true },
	x_coordinate: { type: Number, require: true },
	y_coordinate: { type: Number, require: true },
	created_by_id: { type: Schema.Types.ObjectId, ref: 'User', require: true },
	created_by_name: { type: String, require: true },
	date: { type: Date, require: true }
});

var commentSchema = Schema({
	text: { type: String, require: true },
	posted_by_id: { type: Schema.Types.ObjectId, ref: 'User', require: true },
	posted_by_name: { type: String, require: true },
	messageboard: { type: Schema.Types.ObjectId, ref: 'Messageboard', require: true },
	date: { type: Date, require: true }
});

/*
	The various schema defined above can be renamed below, where we expose
	them to the rest of the application through module.exports.  
*/
module.exports = {
	User: mongoose.model('User', userSchema),
	Messageboard: mongoose.model('Messageboard', messageboardSchema),
	Comment: mongoose.model('Comment', commentSchema)
}