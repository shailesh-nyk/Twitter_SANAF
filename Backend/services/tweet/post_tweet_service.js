var TweetModel = require('../../models/tweet');
var UserModel = require('../../models/users');
var utils = require('../../middleware/utils');

module.exports.postTweet = function(req, callback){
        let newTweet = new TweetModel({
            userId: req.user,
            text: req.text,
            image: req.image ? req.image : null
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
