var TweetModel = require('../../models/tweet');

module.exports.reTweet = function(req, callback){
        let newTweet = new TweetModel({
            userId: req.user_id,
            text: req.text,
            parent_id: req.tweet_id
        })
        newTweet.save(function (err, resp) {
            if(err) {
                callback(null,{
                    success: false,
                    msg: err.message,
                    payload: err
                })
            } else{
                updateOriginalTweet(req.tweet_id, req.user_id);
                callback(null,{
                    success: true,
                    msg: "Retweeted successfully!",
                    payload: resp
                }) 
        }
        }); 
};

function updateOriginalTweet(id, user ) {
        let search = {
            "_id": id
        }
        let update = {
            $push: {
                "retweetCount": user
            }, 
            $inc: {
                "retweetsCount": 1
            }
        }
        TweetModel.findOneAndUpdate(search, update,  {safe: true, new: false, useFindAndModify: false}, function(err, result){
            if(err) {
                console.log("ERROR WHILE UPDATING =============================")
            } else {
                console.log("UPDATED SUCCESSFULLY =============================")
            }
        });
}

