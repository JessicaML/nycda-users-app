var express = require('express');
var pug = require('pug');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');

var displayUsers = JSON.parse(fs.readFileSync("users.json"));

function findUser(query) {
	for (var i = 0; i < displayUsers.length; i++) {
		if (displayUsers[i].firstname.match(query)) {
			return displayUsers[i];
		} else if(displayUsers[i].lastname.match(query))  {
			return displayUsers[i];
		}
	}
}

function addUser(firstname, lastname, emailAddress) {
	newUser = {
		"firstname": firstname,
		"lastname": lastname,
		"email": emailAddress,
	};
	//assign values to the object
	console.log(newUser);
	console.log(firstname);
	console.log(lastname);
	console.log(emailAddress);
	//create an object from form input
	//push new user  to JSON file

	displayUsers.push(newUser);
	console.log(displayUsers);

	jsonUsers = JSON.stringify(displayUsers);

	fs.writeFile('users.json', jsonUsers, function (err) {
	if (err) throw err;
	console.log('It\'s saved!');
	});

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
	if (foundUser === undefined) {
		res.send(pug.renderFile('views/not-found.pug'));

	} else {
		res.send(pug.renderFile('views/user.pug', { user: foundUser }));
	}

});


app.get('/add-user', function(req, res) {
	res.send(pug.renderFile('views/add-user.pug'));
});



// app.post('/add-user', function(req, res){
//    console.log('post request on search page');
//    res.redirect('/add-user/' + req.body.firstname + req.body.lastname + req.body.emailAddress);
// });

app.post('/add-user', function(req, res){
  console.log('adding users...');
	res.redirect('/users');
	addUser(req.body.firstname, req.body.lastname, req.body.emailAddress);
});


app.listen(3001, function() {
 console.log('Web server started on port 3001');
});
