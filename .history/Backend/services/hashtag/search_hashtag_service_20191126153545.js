var HashtagModel = require('../../models/HashtagModel');
var TweetModel = require('../../models/tweet');

module.exports.searchHashtag = function(req,callback) {
    HashtagModel.find({"hashtag" : req.hashtag } , 'tweets')
    .then( result => {
        if(result){
            let search = {
                "_id" : { $in : result}
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
            }).populate('userId')
            .sort({ postedOn : 'descending'})
        }
    })
    .catch(err => {
        console.log("err in getNewsFeed ",err.message)
    });
}