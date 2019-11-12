var TweetModel = require('../../models/tweet');
var UserModel = require('../../models/users');

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
                msgDesc: err
        })
    }
    else if(result) {
        callback(null,{
            success: true,
            msg: "Successfully fetched the tweet" ,
            msgDesc: result
        }) 
    } 
    }).populate('user');
};

