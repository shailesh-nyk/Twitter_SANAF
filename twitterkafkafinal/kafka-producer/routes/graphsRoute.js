var express = require('express');
var router = express.Router();
var graphController = require('../controller/GraphController') ;
const passport = require("passport");
var requireAuth = passport.authenticate('jwt', {session: false});

router.get('/tweets_with_views',graphController.tweets_with_views);

router.get('/tweets_with_likes',graphController.tweets_with_likes);

router.get('/tweets_with_retweets',graphController.tweets_with_retweets);

router.get('/tweets_frequency_wise_daily',graphController.tweets_frequency_wise_daily);

router.get('/tweets_frequency_wise_monthly',graphController.tweets_frequency_wise_monthly);

router.get('/tweets_frequency_wise_hourly',graphController.tweets_frequency_wise_hourly);

router.get('/tweets_with_profile_views',requireAuth,graphController.tweets_with_profile_views);

module.exports = router;