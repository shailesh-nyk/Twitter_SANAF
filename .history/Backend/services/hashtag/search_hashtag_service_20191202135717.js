var HashtagModel = require('../../models/hashtag');
var TweetModel = require('../../models/tweet');
var mongoose = require('mongoose');
var utils = require('../../middleware/utils');

module.exports.searchHashtag = function(req,callback) {
    HashtagModel.findOne({'hashtag' : req.hashtag }, 'tweets').exec()
    .then( result => {
        if(result == null || result.tweets == null || result.tweets.length ==0){
            callback(null,{
                success: true,
                msg: "No tweets with that hashtag yet!" ,
                payload: result
            }) 
        } else {
        if(result.tweets){
            let search = {
                "_id" : { $in : result.tweets}
            }
            TweetModel.find( search ,function (err, result) {
                if (err) {
                    callback(null, {
                        success: false,
                        msg: "Something went wrong",
                        payload: err
                    })
                }
                else if(result) {
                    result.map(tweet => {
                        tweet.set('timeElapsed', utils.getTimeElapsed(tweet.postedOn) , {strict: false});
                        tweet.comments.map(comment => {
                            comment.set('timeElapsed', utils.getTimeElapsed(comment.postedOn) , {strict: false});
                        })
                    })
                    callback(null,{
                        success: true,
                        msg: "Successfully fetched hashtag tweets" ,
                        payload: result
                    }) 
                }
            })
            .populate('tweets')
            .sort({ postedOn : 'descending'})
        }
    }
    })
    .catch(err => {
        console.log("err in searchHashtag ",err.message)
    });
}
