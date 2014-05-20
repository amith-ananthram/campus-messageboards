var db = require('../../models')

// serves the registration form
exports.form = function(req, res) {
	res.render('register.ejs', { title: 'Register' });
};

// deals with submissions of the registration form
exports.submit = function(req, res) {
	var data = req.body.user;

	// check to see if the given user already exists
	db.User.findOne({'name': data.name}, function(err, user) {
		if (err) throw err;
		
		// if it already exists, try again!
		if ( user ) {
			res.error("Username already taken!");
			res.redirect('back');
		}
		// otherwise save this new user
		else {
			var user = new db.User({
				name: data.name,
				password: data.pass,
				date: new Date()
			});

			user.save(function(err, user) {
				if (err) throw err;

				req.session.uid = user.id;
				req.user = res.locals.user = user.name;
				res.redirect('/');
			});	
		}
	});
}