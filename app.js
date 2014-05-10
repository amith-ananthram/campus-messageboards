
/*
Required modules
*/
var http = require('http');
var path = require('path');
//var socket = require('socket.io');
var express = require('express');
var connect = require('connect');

var app = express();

var mongoose = require('mongoose');
var db = mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://localhost/messageboards')

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
//app.use(express.logger('dev'));
//app.use(require('stylus').middleware(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.json());
//app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(connect.methodOverride());
app.use(connect.cookieParser());
app.use(connect.session({'secret' : 'secret'}));

var user = require('./lib/user');
app.use(user);

var messages = require('./lib/messages');
app.use(messages);

/*
	Pages needed:
		'/'	-	the campus map (get)
		'/create_messageboard' - create a new messageboard (post)
		'/messageboards/:messageboard_id' - join an existing messageboard (get)
		'/messageboards/:messageboard_id' - post to an existing messageboard (post)
*/
var routes = require('./routes');
app.get('/', routes.get_map);
//app.post('/create_messageboard', routes.create_messageboard);
app.post('/messageboards/:messageboard_id/:message', routes.make_post);
app.get('/messageboards/:messageboard_id', routes.access_messageboard);

// user registration
app.get('/register', routes.auth.registration.form);
app.post('/register', routes.auth.registration.submit);

// user authentication
app.get('/login', routes.auth.authentication.form);
app.post('/login', routes.auth.authentication.submit);
app.get('/logout', routes.auth.authentication.logout);

// server listening on port 3000
app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'))
});