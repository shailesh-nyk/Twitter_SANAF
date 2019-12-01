var tweetWithViewsService = require('../services/graphs/tweet_with_views_service');
var tweetWithLikesService = require('../services/graphs/tweet_with_likes_service');
var tweetWithRetweetsService = require('../services/graphs/tweet_with_retweets_service');
var tweetFrequencyWiseService = require('../services/graphs/tweet_frequency_wise_service');
var tweetWithProfileViewsService = require('../services/graphs/tweet_with_profile_views_service');

const messageServiceMap = {
    'TWEETS_WITH_VIEWS' : tweetWithViewsService.tweetsWithViews,
    'TWEETS_WITH_LIKES' : tweetWithLikesService.tweetsWithLikes,
    'TWEETS_WITH_RETWEETS' : tweetWithRetweetsService.tweetsWithRetweets,
    'TWEETS_FREQUENCY_WISE_DAILY' : tweetFrequencyWiseService.tweetsFrequencyWiseDaily,
    'TWEETS_FREQUENCY_WISE_MONTHLY' : tweetFrequencyWiseService.tweetsFrequencyWiseMonthly,
    'TWEETS_FREQUENCY_WISE_HOURLY' : tweetFrequencyWiseService.tweetsFrequencyWiseHourly,
    'TWEETS_WITH_PROFILE_VIEWS' : tweetWithProfileViewsService.tweetsWithProfileViews

}

module.exports.handleRequest = function(req, callback){
     let func = messageServiceMap[req.message];
     console.log("====== RECEIVED REQUEST FOR  " + req.message + "=======");
     console.log(req.body);
     console.log("==================================")
     func(req.body, callback);
};

