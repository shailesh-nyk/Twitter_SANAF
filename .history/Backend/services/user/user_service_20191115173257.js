var TweetModel = require('../../models/tweet');

module.exports.getNewsFeed = function(req, callback){
    TweetModel.find({ "user.name": req.name },function (err, result) {
    if (err) {
        callback(null, {
                success: false,
                msg: "Something went wrong",
                payload: err
        })
    }
    else if(result) {
        callback(null,{
            success: true,
            msg: "Successfully fetched the tweet" ,
            payload: result
        }) 
    } 
    }).populate('user');
};