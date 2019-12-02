var TweetModel = require('../../models/tweet');
var UserModel = require('../../models/users');
var utils = require('../../middleware/utils');

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
        result.comments.reverse();
        callback(null,{
            success: true,
            msg: "Successfully fetched the tweet" ,
            payload: result
        }) 
    } 
    }).populate( [{ path:'userId', select:'name handle avatar'}, { path:'comments.user', select:'name handle avatar'}]);
};
