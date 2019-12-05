var HashtagModel = require('../../models/hashtag');
var findHashtags = require('find-hashtags');


module.exports.addHashtag = function(req){
    var hashtags = findHashtags(req.tweetText);
    const promises = hashtags.map( hashtag => {
        return new Promise((resolve,reject) => {
            HashtagModel.updateOne( 
                {
                    "hashtag": hashtag
                },
                {
                    hashtag : hashtag ,
                    $push: {
                        "tweets":  req.tweet_id
                    }
                },
                {
                    upsert : true
                },
                function(err,res){
                    if (err) {
                        reject(err)
                    } else {
                        resolve(res)
                    }
                }
            )
        })
    })
    Promise.all(promises)
    .then( (result ) => {
        return
    })
    .catch( err => {
    })
}
