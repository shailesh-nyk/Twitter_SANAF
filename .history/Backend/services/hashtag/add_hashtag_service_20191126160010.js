var HashtagModel = require('../../models/hashtag');

module.exports.addHashtag = function(req,callback){
    let search = {
        "hashtag": req.hashtag
    }
    let update = {
        $push: {
            "tweets":  req.tweet_id
        }
    }
    let options = {
        new: true,
        upsert: true,
        safe : true 
      }
    HashtagModel.updateOne(search, update, options, function(err,result ) {
        if (err) {
            callback(null, {
                success: false,
                msg: "Something went wrong",
                payload: err
            })
        } else {
            callback(null,{
                success: true,
                msg: "Successfully added hashtag on the tweet" ,
                payload: result
            }) 
        }
    })
}