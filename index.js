var express = require('express');
var pug = require('pug');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');

var fs = require('fs');

var displayUsers = JSON.parse(fs.readFileSync("users.json").toString());
console.log(displayUsers[0].firstname);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', function(request, response) {
	response.redirect('/users');
});

app.get('/users', function(req, res) {
	console.log('Requesting /users'); //use morgan middleware for logging
	res.send(pug.renderFile('views/index.pug', {users: displayUsers}));
});

app.get('/Search', function(req, res) {
	console.log('Requesting /search'); //use morgan middleware for logging
	res.send(pug.renderFile('views/search.pug'));
});

app.get('/results', function(req, res) {
	console.log('Requesting /results'); //use morgan middleware for logging
	res.send(pug.renderFile('views/results.pug'));
});

app.get('/add-user', function(req, res) {
	console.log('Requesting /add-user'); //use morgan middleware for logging
	res.send(pug.renderFile('views/add-user.pug'));
});

app.listen(3001, function() {
 console.log('Web server started on port 3001');
});

//


app.post('/search-input', (request, response) => {
  console.log(request.body.searchFName);

    (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
		};
});

// var firstNameSearch = searchFName;

function findUser(firstNameSearch) {

	for (var i = 0; i < displayUsers.length; i++) {
		if (displayUsers[i].firstname === firstNameSearch) {
			firstNameSearch = displayUsers[i];
			return firstNameSearch;
			// display first name in blue
		}
	}
}

// function findUser(firstNameSearch) {
// 	for (var i = 0; i < displayUsers.length; i++) {
// 		if (displayUsers[i].firstname === firstNameSearch) {
// 			return displayUsers[i];
// 		}
// 	}
// }
//
// function findUser(firstNameSearch) {
// 	for (var i = 0; i < displayUsers.length; i++) {
// 		if (displayUsers[i].firstname === firstNameSearch) {
// 			return displayUsers[i];
// 		}
// 	}
// }
