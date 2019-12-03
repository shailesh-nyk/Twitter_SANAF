var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

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
router.post('/', function(req, res) {
  console.log('INSIDE POST ' + req.url);
  let request = {
    body: req.body,
    message: 'ADDHASHTAG'
  }
  kafka.make_request('tweet', request , res);
})

module.exports = router;
