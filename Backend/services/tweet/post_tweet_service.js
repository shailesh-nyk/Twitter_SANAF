var TweetModel = require('../../models/tweet');
var UserModel = require('../../models/users');
var utils = require('../../middleware/utils');
var hashtagService = require('./../hashtag/add_hashtag_service');

module.exports.postTweet = function (req, callback) {
    let newTweet = new TweetModel({
        userId: req.user,
        text: req.text,
        image: req.image ? req.image : null
    })
    newTweet.save(function (err, resp) {
        if (err) {
            callback(null, {
                success: false,
                msg: err.message,
                payload: err
            })
        } else {
            hashtagService.addHashtag({tweetText : req.text , tweet_id : resp.id})
            utils.invalidateRedis(req.user);
            callback(null, {
                success: true,
                msg: "Posted the tweet successfully!",
                payload: resp
            })
        }
    });
};


