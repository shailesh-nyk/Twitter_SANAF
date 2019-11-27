var UserModel = require('../../models/users');
var utils = require('../../middleware/utils');

module.exports.bookmarkTweet = function(req, callback){
        let update = {
            $push : {
                bookmarks : req.tweet_id
            }
        }
        UserModel.findByIdAndUpdate(req.user_id , update, function (err, resp) {
            if(err) {
                callback(null,{
                    success: false,
                    msg: err.message,
                    payload: err
                })
            } else{
                callback(null,{
                    success: true,
                    msg: "Bookmarked the tweet successfully!",
                    payload: null
                }) 
        }
        }); 
};
