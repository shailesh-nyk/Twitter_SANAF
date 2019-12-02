var TweetModel = require('../../models/tweet');
var UserModel = require('../../models/users');
var utils = require('../../middleware/utils');
var userService = require('../../services/user/mongo_user_fetch_following');
var Redis = require("ioredis");
var redis = new Redis(6379, "54.172.121.236", { password: "kafkasucks" });

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
                invalidateRedis(req.user);
                callback(null,{
                    success: true,
                    msg: "Posted the tweet successfully!",
                    payload: resp
                }) 
        }
        }); 
};

function invalidateRedis(id) {
    userService.getFollowers({id: id}, function(err, res) {
        let followers = JSON.parse(JSON.stringify(res));
        if(followers.length > 0) {
            redis.del(followers, (err, o)=> {
                if(err) console.log("===============REDIS error while invalidating Cache");
                else console.log("==================REDIS Cache cleared for " + o + "  records");
            })
        }
    })
}
