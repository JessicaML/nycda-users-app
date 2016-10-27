var express = require('express');
var pug = require('pug');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');

var displayUsers = JSON.parse(fs.readFileSync("users.json"));

function findUser(query) {
	for (var i = 0; i < displayUsers.length; i++) {
		if (displayUsers[i].firstname === query) {
			var foundUser = displayUsers[i];
			return displayUsers[i];
		}
	}
}

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', function(request, response) {
	response.redirect('/users');
});

app.get('/users', function(req, res) {
	res.send(pug.renderFile('views/index.pug', { users: displayUsers }));
});

app.get('/search', function(req, res) {
	res.send(pug.renderFile('views/search.pug'));
});

app.post('/search', function(req, res){
   console.log('post request on search page');
   res.redirect('/search/' + req.body.query);
});

app.get('/search/*', function(req, res) {
	var foundUser = findUser(req.params[0]);
	res.send(pug.renderFile('views/user.pug', { users: foundUser }));
	// res.send('search a user with the query: ' + req.params[0]);
	console.log(foundUser);

});

app.listen(3001, function() {
 console.log('Web server started on port 3001');
});
