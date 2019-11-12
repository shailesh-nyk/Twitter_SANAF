var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.get('/', function(req, res, next) {
  res.send('Welcome to Twitter API layer');
});

module.exports = router;
