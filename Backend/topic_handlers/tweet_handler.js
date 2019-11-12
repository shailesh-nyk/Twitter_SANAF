var tweetService = require('../services/tweet/tweet_service');

const messageServiceMap = {
    'POSTTWEET' : tweetService.postTweet,
    'GETTWEET': tweetService.getTweet
}

module.exports.handleRequest = function(req, callback){
     let func = messageServiceMap[req.message];
     console.log("====== RECEIVED REQUEST FOR  " + req.message + " =======");
     console.log(req.body);
     console.log("==================================")
     func(req.body, callback);
};

