var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

//POST A NEW TWEET
router.post('/', function(req, res, next) {
    console.log('INSIDE POST ' + req.url);
    let request = {
      body: req.body,
      message: 'POSTTWEET'
    }
    kafka.make_request('tweet', request , res);
})

router.get('/', function(req, res, next) {
  console.log('INSIDE GET ' + req.url);
  let request = {
    body: req.query,
    message: 'GETTWEET'
  }
  kafka.make_request('tweet', request , res);
})


module.exports = router;
