var express = require('express');
var pug = require('pug');
var app = express();
var fs = require('fs');


var displayUsers = JSON.parse(fs.readFileSync("users.json"));
console.log(displayUsers[0].firstname);

app.use(express.static('public'));

app.get('/', function(request, response) {
	response.redirect('/users');
});

app.get('/users', function(req, res) {
	console.log('Requesting /users');
	res.send(pug.renderFile('views/index.pug', { displayUsers }));
});

app.listen(3001, function() {
 console.log('Web server started on port 3001');
});
