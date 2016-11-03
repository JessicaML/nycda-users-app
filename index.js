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

var likeStore = JSON.parse(fs.readFileSync('likes.json'));

app.set('view engine', 'pug');

app.use(express.static('./public'));

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

app.post('/like', (request, response) => {
  likeStore.likeCount = likeStore.likeCount + 1;

  response.json(likeStore);

  fs.writeFile('likes.json', JSON.stringify(likeStore), (error, data) => {
    if (error) {
      throw error;
    }

    console.log('new likeCount added to likes.json');
  });
});

app.listen(3001, function() {
 console.log('Web server started on port 3001');
});
