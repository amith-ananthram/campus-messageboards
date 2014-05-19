var db = require('../models');

exports.form = function(req, res) {
	// finds all the current whiteboards and passes it to the
	// the campus map to be rendered
	res.render('create_board.ejs', { title: "Create a New Message Board", x_coordinate: req.query.x, y_coordinate: req.query.y } );
};

exports.submit = function(req, res, next) {
	// make sure there's a user logged in
	if ( req.user != undefined ) {
		// make sure there's content in the name
		if ( req.body.name != "" ) {
			// create a new message board from the content
			var board = new db.Messageboard({
				name : req.body.name,
				x_coordinate : req.query.x,
				y_coordinate : req.query.y,
				created_by_id : req.user._id,
				date : new Date()
			});

			board.save();
			res.redirect('/');
		}
		// if not, tell them to include content
		else {
			res.error("Needs a name!");
			res.redirect('back');
		}
	}
	// if not, tell them they have to be logged in
	else {
		res.error("Must be logged in to create a board!");
		res.redirect('back');
	}
};