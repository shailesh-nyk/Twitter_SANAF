var utils = require('../../middleware/utils');
var TweetModel = require('../../models/tweet');
var UserModel = require('../../models/users');
const jwt = require('jsonwebtoken');

process.env.SECRET_KEY = 'secret';


var getToken = (token) => {
    return token.substr(7);
}

module.exports.getNewsFeed = function(req ,callback) {
    UserModel.findById(req.user_id, 'following').exec()
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
