var TweetModel = require('../../models/tweet');
var UserModel = require('../../models/users');
var utils = require('../../middleware/utils');

module.exports.likeTweet = function(req, callback) {
    let search = {
        "_id": req.id
    }
    let update = {
        $push: {
            "likes": req.user_id
        },
        $inc: {
            "likeCount": 1
        }
    }
    TweetModel.findOneAndUpdate(search, update , {safe: true, new: false, useFindAndModify: false}, function(err, result){
        if(err) {
            callback(null,{
                success: false,
                msg: "Something went wrong",
                payload: err
            })
        } else {
            callback(null,{
                success: true,
                msg: "Successfully liked the tweet" ,
                payload: result
            }) 
        }
    });
}

module.exports.unlikeTweet = function(req, callback) {
    let search = {
        "_id": req.id
    }
    let update = {
        $pull: {
            "likes": req.user_id
        }
    }
    TweetModel.findOneAndUpdate(search, update , {safe: true, new: false, useFindAndModify: false}, function(err, result){
    if(err) {
        callback(null,{
            success: false,
            msg: "Something went wrong",
            payload: err
        })
    } else {
        callback(null,{
            success: true,
            msg: "Successfully unliked the tweet" ,
            payload: result
        }) 
    }
    });
}