var express = require('express');
var router = express.Router();
var tweetController = require('../controller/TweetController') ;

//POST A NEW TWEET
router.post('/',tweetController.postTweet);

//GET TWEET
router.get('/',tweetController.getTweets);

router.get('/user',tweetController.getUser);

//LIKE TWEET 
router.put('/like',tweetController.like)

//UNLIKE TWEET 
router.delete('/like',tweetController.delete)

//COMMENT ON A TWEET
router.post('/comment',tweetController.comment)

router.post('/addHashtag',tweetController.addHashtag)

router.put('/view',tweetController.view)

router.post('/bookmark',tweetController.bookmark)

router.get('/getHashtagTweets',tweetController.getHashtagTweets)

router.post('/retweet',tweetController.retweet)

module.exports = router;
