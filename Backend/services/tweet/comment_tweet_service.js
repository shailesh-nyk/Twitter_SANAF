var TweetModel = require('../../models/tweet');
var UserModel = require('../../models/users');
var utils = require('../../middleware/utils');

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