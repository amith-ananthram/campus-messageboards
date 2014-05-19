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
	bcrypt allows easy hashing of passwords
*/
var bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;

var userSchema = Schema({
	name: { type: String, require: true },
	password: { type: String, require: true },
	date: { type: Date, require: true }
});

// middleware that automatically hashes the password
// before it's saved
userSchema.pre('save', function(next) {
	var user = this;

	// only hash the password if the password has been set
	if (user.isModified('password')) {
 
   		// hash the password 
   		bcrypt.hash(user.password, SALT_WORK_FACTOR, function(err, hash) {
   			if (err) return next(err);

		    // use the hash instead of the plaintext password
   			user.password = hash;
   			next();
   		});
    } else {
    	next();
    }
});

// compare an inputed password to a users password
// callback has signature function(err, doesMatch)
userSchema.methods.comparePassword = function(candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, callback);
};

var messageboardSchema = Schema({
	name: { type: String, require: true },
	x_coordinate: { type: Number, require: true },
	y_coordinate: { type: Number, require: true },
	created_by_id: { type: Schema.Types.ObjectId, ref: 'User', require: true },
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