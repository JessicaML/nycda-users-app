const express = require('express'),
			pug = require('pug');
			morgan = require('morgan');
			bodyParser = require('body-parser');
			fs = require('fs');

const userRoutes = require('./routes/users'),
			searchRoutes = require('./routes/search'),
			resultRoutes = require('./routes/search'),
			addRoutes = require('./routes/add-user');

var app = express();
		displayUsers = require('./user-store');

app.set('view engine', 'pug');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', userRoutes);

app.use('/search', searchRoutes);

app.use('/add-user', addRoutes);

app.get('/', (request, response) => {
	response.render('users/index', { users: displayUsers.getUsers() });
});

app.get('/', (request, response) => {
	response.render('search/user', { users: displayUsers.searchUsers() });
});



app.listen(3001, function() {
 console.log('Web server started on port 3001');
});
