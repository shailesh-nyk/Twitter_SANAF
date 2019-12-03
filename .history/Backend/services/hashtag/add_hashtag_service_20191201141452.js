var HashtagModel = require('../../models/hashtag');
var findHashtags = require('find-hashtags');


module.exports.addHashtag = function(req,callback){
    var hashtags = findHashtags(req.tweetText);
    
    let search = {
        "hashtag": { $in : hashtags }
    }
    let update = {
        $push: {
            "tweets":  req.tweet_id
        }
    }
    let options = {
        upsert: true,
      }
    let upsertDoc = {
    'updateOne': {
        'filter': search,
        'update': update,
        'upsert': true
    }};

    HashtagModel.bulkWrite([upsertDoc],function(err,result) {
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