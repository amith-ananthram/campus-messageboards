exports.auth = require('./auth');

exports.get_map = require('./get_map');
exports.create_messageboard = require('./create_messageboard');
exports.access_messageboard = require('./access_messageboard');
exports.make_post = require('./make_post');
exports.how_it_works = function(req, res){
	res.render('how_it_works.ejs', { title: "How It Works"});
}
