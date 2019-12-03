var HashtagModel = require('../../models/hashtag');
var TweetModel = require('../../models/tweet');

module.exports.searchHashtag = function(req,callback) {
    HashtagModel.find({"hashtag" : req.hashtag } )
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
                        msg: "Successfully fetched hashtag tweets" ,
                        payload: result
                    }) 
                }
            }).populate('userId')
            .sort({ postedOn : 'descending'})
        }
    })
    .catch(err => {
        console.log("err in searchHashtag ",err.message)
    });
}
