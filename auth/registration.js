var db = require('../models')

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
			var user = new db.User({
				name: data.name,
				password: data.pass
			});

			user.save(function(err, user) {
				if (err) return next(err);

				console.log(user);

				req.session.uid = user.id;
				req.user = res.locals.user = user.name;
				res.redirect('/');
			});	
		}
	});
}