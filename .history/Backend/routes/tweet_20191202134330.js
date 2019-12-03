var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');
var jwt_decode = require('jwt-decode');

//POST A NEW TWEET
router.post('/', function(req, res) {
    console.log('INSIDE POST ' + req.url);
    let request = {
      body: req.body,
      message: 'POSTTWEET'
    }
    kafka.make_request('tweet', request , res);
})

//GET TWEET
router.get('/', function(req, res) {
  console.log('INSIDE GET ' + req.url);
  let request = {
    body: req.query,
    message: 'GETTWEET'
  }
  kafka.make_request('tweet', request , res);
})
router.get('/user',function(req,res) {
  console.log('INISDE get all tweets of users');
  let request = {
    body: req.query,
    message: 'GETUSERSTWEETS'
  }
  kafka.make_request('tweet', request, res);
})
//LIKE TWEET 
router.put('/like', function(req, res) {
  console.log('INSIDE PUT ' + req.url);
  let request = {
    body: req.body,
    message: 'LIKETWEET'
  }
  kafka.make_request('tweet', request , res);
})

//UNLIKE TWEET 
router.delete('/like', function(req, res) {
  console.log('INSIDE DELETE ' + req.url);
  let request = {
    body: req.body,
    message: 'UNLIKETWEET'
  }
  kafka.make_request('tweet', request , res);
})

//COMMENT ON A TWEET
router.post('/comment', function(req, res) {
  console.log('INSIDE POST ' + req.url);
  let request = {
    body: req.body,
    message: 'COMMENTTWEET'
  }
  kafka.make_request('tweet', request , res);
})

//ADD A HASHTAG
router.post('/addHashtag', function(req, res) {
  console.log('INSIDE POST ' + req.url);
  let request = {
    body: req.body,
    message: 'ADDHASHTAG'
  }
  kafka.make_request('tweet', request , res);
})

//INCREMENT VIEW COUNT
router.put('/view', function(req, res) {
  console.log('INSIDE PUT ' + req.url);
  let request = {
    body: req.body,
    message: 'INCREMENT_VIEW'
  }
  kafka.make_request('tweet', request , res);
})

//BOOKMARK A TWEET
router.post('/bookmark', function(req, res) {
  req.body['user_id'] = jwt_decode(req.headers.authorization).id;
  let request = {
    body: req.body, 
    message: 'BOOKMARK_TWEET'
  }
  kafka.make_request('tweet', request , res);
})


//SEARCH A HASHTAG
router.get('/getHashtagTweets', function(req, res) {
  console.log('INSIDE POST ' + req.url);
  let request = {
    body: req.query,
    message: 'GETHASHTAGTWEETS'
  }
  kafka.make_request('tweet', request , res);
})

//RETWEET
router.post('/retweet', function(req, res) {
  console.log('INSIDE POST ' + req.url);
  req.body['user_id'] = jwt_decode(req.headers.authorization).id;
  let request = {
    body: req.body,
    message: 'RETWEET'
  }
  kafka.make_request('tweet', request , res);
})

module.exports = router;
