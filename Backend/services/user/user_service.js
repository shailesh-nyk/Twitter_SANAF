var utils = require('../../middleware/utils');
var TweetModel = require('../../models/tweet');
var UserModel = require('../../models/users');
var Redis = require("ioredis");
var redis = new Redis(6379, "54.172.121.236", { password: "kafkasucks" });

process.env.SECRET_KEY = 'secret';

module.exports.getNewsFeed = function(req ,callback) {
    redis.exists(req.user_id)
    .then( flag => {
        if(flag == 1) {
            redis.get(req.user_id, (err, resp) => {
                if(err) getNewsFeedDB(req.user_id, callback);
                else {
                    callback(null, {
                        success: true,
                        msg: "Successfully fetched the newsfeed from redis" ,
                        payload: JSON.parse(resp)
                    })
                }
            })
        } else {
            getNewsFeedDB(req.user_id, callback);
        }
    })
}

var getNewsFeedDB = (user_id, callback) => {
    UserModel.findById(user_id, 'following').exec()
    .then( result => {
        var d = new Date();
        d.setDate(d.getDate() - 30);
        let search = {
           "userId" : { $in : result.following},
           "postedOn" : { $gt : d}
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
                redis.set(user_id, JSON.stringify(result));
                callback(null,{
                    success: true,
                    msg: "Successfully fetched the newsfeed" ,
                    payload: result
                }) 
            } 
        }).populate( [{ path:'userId', select:'name handle avatar'}, { path:'comments.user', select:'name handle avatar'}])
        .sort({ postedOn : 'descending'})
    })
    .catch(err => {
        console.log("err in getNewsFeed ",err.message)
    });
}
