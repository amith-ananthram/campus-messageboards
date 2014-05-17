/*
	Required modules.

	path - allows node to easily navigate the filesystem
	express - a webframework built for node
	connect - a middleware framework built for node
	mongoose - allows easy object modeling in a mongodb
*/
var path = require('path');
var express = require('express');
var connect = require('connect');
var mongoose = require('mongoose');

var app = express();

/*
	Connects mongoose to the underlying mongodb.
*/
var db = mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://localhost/messageboards')

/*
	The following lines give the express application its initial settings.  They do things like:
		1. set the port on which the application will be running
		2. set the directory where node will look for views
		3. set the view engine (in this case, embedded javascript)
		4. set the directory where node will look for static files
	
	They also give the application access to middleware components that allow
	the processing of requests (get their parameters) etc.

*/
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(connect.methodOverride());

/*
	The following enable your auth middleware to store a user cookie within a session
	that gets passed around from page to page. 
*/
app.use(connect.cookieParser());
app.use(connect.session({'secret' : 'secret'}));

/*
	For this application, we build two pieces of middleware, stored in the /lib/ folder.
*/

var user = require('./lib/user');
app.use(user);

var messages = require('./lib/messages');
app.use(messages);

/*
	Pages needed:
		'/'	-	the campus map (get)
		'/create_messageboard/:x_coordinate/:y_coordinate' - renders the form (get)
		'/create_messageboard/:x_coordinate/:y_coordinate' - create a new messageboard (post)
		'/messageboards/:messageboard_id' - join an existing messageboard (get)
		'/messageboards/:messageboard_id' - post to an existing messageboard (post)
*/
var routes = require('./routes');

// serves the map
app.get('/', routes.get_map);

// form for creating messageboards (and the subsequent post)
app.get('/create_messageboard', routes.create_messageboard.form);
app.post('/create_messageboard', routes.create_messageboard.submit);

// accessing messageboards and making posts
app.get('/messageboards/:messageboard_id', routes.access_messageboard);
app.post('/messageboards/:messageboard_id', routes.make_post);

// user registration
app.get('/register', routes.auth.registration.form);
app.post('/register', routes.auth.registration.submit);

// user authentication
app.get('/login', routes.auth.authentication.form);
app.post('/login', routes.auth.authentication.submit);
app.get('/logout', routes.auth.authentication.logout);

//site help
app.get('/how_it_works', routes.how_it_works);

// server listening on port 3000
app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'))
});