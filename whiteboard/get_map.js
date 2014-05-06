/*
get_map.js needs to query the database for the locations of all the current whiteboards.

It then loads a map of campus with all the whiteboard locations marked (and clickable).
*/
var db = require('../models')

module.exports = function(req, res) {
	// db stuff should go here

	//EventEmitter = require('events').EventEmitter;
	//emitter = new EventEmitter();
	//emitter.on('mouse_click', function(x, y) {
	//	console.log('X: ' + x + 'Y: ' + y);
	//})

	// tests out users

	/*var user = new db.User({
		name: 'amith',
		password: 'test'
	});

	user.save(function(err, user) {
		if (err) throw err;
		console.log(user);
	});*/

	/*db.User.find().exec(function(err, users) {
		if (err) throw err;

		console.log(users);
	});*/
	
	// test whiteboard
	/*
	var whiteboard = new db.Whiteboard({
		name: "test",
		x_coordinate: 200,
		y_coordinate: 150
	});

	whiteboard.save(function(err, whiteboard) {
		if (err) throw err;
		console.log(whiteboard);
	});*/

	// finds all the current whiteboards and passes it to the
	// the campus map to be rendered
	db.Whiteboard.find().exec(function(err, chatrooms) {
		if (err) throw err;

		res.render('map.ejs', { title: "Campus Map", chatrooms : chatrooms })
	});
	
	//var current_whiteboards = [[10, 1], [100, 100], [52, 70]];
	//res.render('map.ejs', { title : "Campus Map", current_whiteboards : current_whiteboards });
};