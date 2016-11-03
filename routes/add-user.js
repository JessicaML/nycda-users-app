const express = require('express'),
      fs = require('fs'),
      router = express.Router();

var displayUsers = require('./../user-store');

router.get('/', (request, response) => {
  response.render('users/add-user');
});

router.post('/', (request, response) => {
  displayUsers.addUser(request.body);
  response.redirect('/');
});

module.exports = router;
