/*
get_map.js needs to query the database for the locations of all the current whiteboards.

It then loads a map of campus with all the whiteboard locations marked (and clickable).
*/
module.exports = function(req, res) {
	// db stuff should go here

	res.render('map.ejs');
};