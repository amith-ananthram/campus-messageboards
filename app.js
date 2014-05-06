
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
var db = mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://localhost/whiteboards')

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
		'/create_whiteboard' - create a new whiteboard (post)
		'/whiteboards/:whiteboard_id' - join an existing whiteboard (get)
		'/whiteboards/:whiteboard_id' - post to an existing whiteboard (post)
*/
var whiteboard = require('./whiteboard');
app.get('/', whiteboard.get_map);
//app.post('/create_whiteboard', whiteboard.create_whiteboard);
//app.get('/whiteboards/:whiteboard_id', whiteboard.access_whiteboard);
//app.post('/whiteboards/:whiteboard_id', whiteboard.make_post);

var auth = require('./auth');

// user registration
app.get('/register', auth.registration.form);
app.post('/register', auth.registration.submit);

// user authentication
app.get('/login', auth.authentication.form);
app.post('/login', auth.authentication.submit);
app.get('/logout', auth.authentication.logout);

// server listening on port 3000
app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'))
});