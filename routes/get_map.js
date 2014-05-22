/*
get_map.js needs to query the database for the locations of all the current whiteboards.

It then loads a map of campus with all the whiteboard locations marked (and clickable).
*/
var db = require('../models')

module.exports = function(req, res) {
	// finds all the current whiteboards and passes it to the
	// the campus map to be rendered
	db.Messageboard.find(function(err, messageboards) {
		if (err) throw err;

		// note the call to JSON.stringify in the controller
		// required to access JSON objects in <script> tags
		res.render('map.ejs', { title: "Campus Map", messageboards : JSON.stringify(messageboards) });
	});
};