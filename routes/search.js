const express = require('express'),
      fs = require('fs'),
      router = express.Router();

var displayUsers = require('./../user-store');

// router.get('/', (request, response) => {
//   response.render('search/search');
// });

// router.post('/', function(req, res){
//    console.log(req.body.query);
//    res.redirect('/search/' + req.body.query);
// });
//
// router.get('/:query', (request, response) => {
//   var results = displayUsers.searchUsers(request.params.query);
//
//   response.render('search/user', { results: results });
// });

router.get('/api/search/*', (req, res) => {
  var results = userStore.searchUsers(reg.params[0]);
  console.log(chalk.green('RESULTS ARE:'));
  console.log(results);

  res.json(results);
});
// router.get('/search/*', function(request, response) {
//   var results = searchUsers(request.body.query);
//   response.render('search/user', { results: searchUsers });
// });
//
// router.get('/search/*', function(request, response) {
// 	searchUsers(req.params[0]);
// 	if (searchUsers.length === 0) {
// 		res.send(pug.renderFile('views/not-found.pug'));
// 	} else {
// 		res.send(pug.renderFile('views/user.pug', { users: users }));
// 	}
// });

//
// app.get('/search/*', function(req, res) {
// 	findUsers(req.params[0]);
// 	if (searchResults.length === 0) {
// 		res.send(pug.renderFile('views/not-found.pug'));
// 	} else {
// 		res.send(pug.renderFile('views/user.pug', { users: searchResults }));
// 	}
// });

module.exports = router;
