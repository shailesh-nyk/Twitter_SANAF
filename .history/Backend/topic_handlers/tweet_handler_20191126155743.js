const messageServiceMap = {
    'POSTTWEET' : require('../services/tweet/post_tweet_service').postTweet,
    'GETTWEET': require('../services/tweet/get_tweet_service').getTweet,
    'LIKETWEET': require('../services/tweet/like_tweet_service').likeTweet,
    'UNLIKETWEET': require('../services/tweet/like_tweet_service').unlikeTweet,
    'COMMENTTWEET': require('../services/tweet/comment_tweet_service').commentTweet,
    'ADDHASHTAG' : require('../services/hashtag/add_hashtag_service').addHashtag,
}

module.exports.handleRequest = function(req, callback){
     let func = messageServiceMap[req.message];
     console.log("====== RECEIVED REQUEST FOR  " + req.message + " =======");
     console.log(req.body);
     console.log("==================================")
     func(req.body, callback);
};

