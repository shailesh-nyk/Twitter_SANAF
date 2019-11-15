var TweetModel = require('../../models/tweet');
var UserModel = require('../../models/users');
var utils = require('../../middleware/utils');

module.exports.postTweet = function(req, callback){
        let newTweet = new TweetModel({
            user: req.user,
            text: req.text
        })
        newTweet.save(function (err, resp) {
            if(err) {
                callback(null,{
                    success: false,
                    msg: err.message,
                    payload: err
                })
            } else{
                callback(null,{
                    success: true,
                    msg: "Posted the tweet successfully!",
                    payload: resp
                }) 
        }
        }); 
};

module.exports.getTweet = function(req, callback){
    TweetModel.where({ _id: req.id }).findOne(function (err, result) {
    if (err) {
        callback(null, {
                success: false,
                msg: "Something went wrong",
                payload: err
        })
    }
    else if(result) {
        result.set('timeElapsed', utils.getTimeElapsed(result.postedOn) , {strict: false});
        result.comments.map(comment => {
            comment.set('timeElapsed', utils.getTimeElapsed(comment.postedOn) , {strict: false});
        })
        callback(null,{
            success: true,
            msg: "Successfully fetched the tweet" ,
            payload: result
        }) 
    } 
    }).populate('user');
};

module.exports.likeTweet = function(req, callback) {
    let search = {
        "_id": req.id
    }
    let update = {
        $push: {
            "likes": req.user_id
        }
    }
    TweetModel.findOneAndUpdate(search, update , {safe: true, new: true, useFindAndModify: false}, function(err, result){
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
    TweetModel.findOneAndUpdate(search, update , {safe: true, new: true, useFindAndModify: false}, function(err, result){
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

module.exports.commentTweet = function(req, callback) {
    let search = {
        "_id": req.id
    }
    let update = {
        $push: {
            "comments":  {
                text: req.text,
                user: req.user,
                postedOn: Date.now()
            }
        }
    }
    TweetModel.findOneAndUpdate(search, update , {safe: true, new: true, useFindAndModify: false}, function(err, result){
    if(err) {
        callback(null,{
            success: false,
            msg: "Something went wrong",
            payload: err
        })
    } else {
        callback(null,{
            success: true,
            msg: "Successfully commented on the tweet" ,
            payload: result
        }) 
    }
    });
}