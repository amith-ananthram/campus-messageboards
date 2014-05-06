var db = require('../models')

module.exports = function(req, res, next) {
	var uid = req.session.uid;

	if (!uid) return next();

	db.User.findById(uid, function(err, user) {
		if (err) return next(err);

		req.user = res.locals.user = user;
		next();
	});
};