var db = require('../models')
var bcrypt = require('bcrypt')

exports.form = function(req, res) {
	res.render('login', { title: 'Login' });
};

exports.submit = function(req, res, next) {
	var data = req.body.user;

	// check to see if the user exists
	db.User.find({'name': data.name}, function(err, users) {
		if (err) throw err;

		// if the username doesn't exist
		if ( users.length == 0 ) {
			res.error("Sorry!  Invalid username!");
			res.redirect('back');
		}

		// if it does exist, check the password
		var user = users[0];

		bcrypt.hash(data.pass, user.salt, function(err, hash) {
			if (err) throw err;

			// incorrect password
			if ( hash != user.password ) {
				res.error("Sorry!  Wrong password!");
				res.redirect('back');
			}
			else {
				req.session.uid = user.id;
				res.redirect('/');
			}
		})
	});
}

exports.logout = function(req, res) {
	req.session.destroy(function(err) {
		if (err) throw err;
		res.redirect('/');
	})
}