var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var kafka = require('../kafka/client');

router.get('/', function(req, res, next) {
  res.send('Welcome to Twitter API layer');
});

router.get('/something', function(req, res, next) {
    let request = {
      body: req.query,
      message: 'SOMETHING'
    }
    kafka.make_request('user', request , res);
})


module.exports = router;
