const express = require('express'),
      fs = require('fs'),
      router = express.Router();

var displayUsers = require('./../user-store');

router.get('/api/search/*', (req, res) => {
  var results = displayUsers.searchUsers(reg.params[0]);
  console.log(chalk.green('RESULTS ARE:'));
  console.log(results);

  res.json(results);
});

module.exports = router;
