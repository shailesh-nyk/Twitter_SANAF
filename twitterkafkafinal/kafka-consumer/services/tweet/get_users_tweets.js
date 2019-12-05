var TweetModel = require('../../models/tweet');
var UserModel = require('../../models/users');
var utils = require('../../middleware/utils');

module.exports.getUsersTweets = function(req, callback){
    console.log(req.id)
    TweetModel.where({ userId: req.id }).find(function (err, result) {
    if (err) {
        callback(null, {
                success: false,
                msg: "Something went wrong",
                payload: err
        })
    }
    else if(result) {
        for(i of result){
         i.set('timeElapsed', utils.getTimeElapsed(i.postedOn) , {strict: false});
         i.comments.map(comment => {
            comment.set('timeElapsed', utils.getTimeElapsed(comment.postedOn) , {strict: false});
        }) 
    }
        callback(null,{
            success: true,
            msg: "Successfully fetched the tweet" ,
            payload: result
        }) 
    } 
    }).populate( [{ path:'userId', select:'name handle avatar'}, { path:'comments.user', select:'name handle avatar'}])
    .sort({ postedOn : 'descending'});
};
