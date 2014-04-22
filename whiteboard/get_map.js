/*
get_map.js needs to query the database for the locations of all the current whiteboards.

It then loads a map of campus with all the whiteboard locations marked (and clickable).
*/
module.exports = function(req, res) {
	// db stuff should go here

	EventEmitter = require('events').EventEmitter;
	emitter = new EventEmitter();
	emitter.on('mouse_click', function(x, y) {
		console.log('X: ' + x + 'Y: ' + y);
	})

	res.render('map.ejs', { title : "Campus Map", click_emitter : emitter });
};