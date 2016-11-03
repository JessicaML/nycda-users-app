const express = require('express'),
      fs = require('fs'),
      router = express.Router();

var displayUsers = require('./../user-store');

router.get('/', (request, response) => {
  response.render('users/index');
});

module.exports = router;
