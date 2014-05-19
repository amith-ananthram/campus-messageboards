var db = require('../../models')
var bcrypt = require('bcrypt')


exports.login = function(req, res) {
	res.render('login', { title: 'Login' });
};

exports.submit = function(req, res, next) {
	var data = req.body.user;

	// check to see if the user exists
	db.User.findOne({'name': data.name}, function(err, user) {
		if (err) throw err;

		// the username doesn't exist
		if ( user == null ) {
			res.error("Sorry!  Invalid username!");
			res.redirect('back');
		}
		else {
			// if it does exist, check the password
			user.comparePassword(data.pass, function(err, isMatch) {
				if (err) throw err;

				if ( isMatch ) {
					req.session.uid = user.id;
					req.user = res.locals.user = user.name;
					res.redirect('/');
				}
				else {
					res.error("Sorry!  Wrong password!");
					res.redirect('back');
				}
			});	
		}	
	});
}

exports.logout = function(req, res) {
	req.session.destroy(function(err) {
		if (err) throw err;
		res.redirect('/');
	})
}