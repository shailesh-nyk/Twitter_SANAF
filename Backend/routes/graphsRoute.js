var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var kafka = require('../kafka/client');
var jwt_decode = require('jwt-decode');

router.get('/tweets_with_views', function(req, res) {
    let request = {
      body: req.query,
      message: 'TWEETS_WITH_VIEWS'
    }
    kafka.make_request('graphs', request , res);
});

router.get('/tweets_with_likes', function(req, res) {
  
  let request = {
    body: req.query,
    message: 'TWEETS_WITH_LIKES'
  }
  kafka.make_request('graphs', request , res);
});

router.get('/tweets_with_retweets', function(req, res) {
  
  let request = {
    body: req.body,
    message: 'TWEETS_WITH_RETWEETS'
  }
  kafka.make_request('graphs', request , res);
});

router.get('/tweets_frequency_wise_daily', function(req, res) {
  
  let request = {
    body: req.body,
    message: 'TWEETS_FREQUENCY_WISE_DAILY'
  }
  kafka.make_request('graphs', request , res);
});

router.get('/tweets_frequency_wise_monthly', function(req, res) {
  
  let request = {
    body: req.body,
    message: 'TWEETS_FREQUENCY_WISE_MONTHLY'
  }
  kafka.make_request('graphs', request , res);

});

router.get('/tweets_frequency_wise_hourly', function(req, res) {
  
  let request = {
    body: req.body,
    message: 'TWEETS_FREQUENCY_WISE_HOURLY'
  }
  kafka.make_request('graphs', request , res);
  
});


//Tweets with Profile Views per day
router.get('/tweets_with_profile_views', function(req, res) {
  
  let request = {
    body: req.user,
    message: 'TWEETS_WITH_PROFILE_VIEWS'
  }
  kafka.make_request('graphs', request , res);

});


module.exports = router;