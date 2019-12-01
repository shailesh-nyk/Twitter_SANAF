var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.get('/', function(req, res) {
    console.log('INSIDE GET ' + req.url);
    let request = {
      body: req.query,
      message: 'GET_TWEET_HASHTAG'
    }
    kafka.make_request('hashtag', request , res);
  })

module.exports = router;