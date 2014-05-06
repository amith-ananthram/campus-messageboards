var db = require('../models')
var bcrypt = require('bcrypt')

// serves the registration form
exports.form = function(req, res) {
	res.render('register.ejs', { title: 'Register' });
};

// deals with submissions of the registration form
exports.submit = function(req, res, next) {
	var data = req.body.user;

	// check to see if the given user already exists

	db.User.find({'name': data.name}, function(err, users) {
		if (err) throw err;

		// if it already exists, try again!
		if ( users.length > 0 ) {
			res.error("Username already taken!");
			res.redirect('back');
		}
		// otherwise save this new user
		else {
			// first salt the password
			bcrypt.genSalt(12, function(err, salt) {
				if (err) throw err;

				// save the salt for later
				data.salt = salt;

				bcrypt.hash(data.pass, salt, function(err, hash) {
					if (err) throw err;
					
					var user = new db.User({
						name: data.name,
						password: hash,
						salt: data.salt
					});

					// save the user into Mongo
					user.save(function(err, user) {
						if (err) return next(err);
						
						console.log(user);

						//req.session.uid = user.id;
						res.redirect('/');
					});
				});
			});			
		}
	});
}