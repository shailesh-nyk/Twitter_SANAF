var HashtagModel = require('../../models/hashtag');
var findHashtags = require('find-hashtags');


module.exports.addHashtag = function(req,callback){
    var hashtags = findHashtags(req.tweetText);
    let search = {
        "hashtag": { $in : hashtags }
    }
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
                        resolve(1)
                    }
                }
            )
        })
    })
    Promise.all(promises)
    .then( (result ) => {
        callback(null,{
            success: true,
            msg: "Successfully added hashtag on the tweet" ,
            payload: result
        }) 
    })
    .catch( err => {
        callback(null, {
            success: false,
            msg: "Something went wrong",
            payload: err
        })
    })


    // HashtagModel.collection.bulkWrite([upsertDoc],function(err,result) {
    //     if (err) {
    //         callback(null, {
    //             success: false,
    //             msg: "Something went wrong",
    //             payload: err
    //         })
    //     } else {
    //         callback(null,{
    //             success: true,
    //             msg: "Successfully added hashtag on the tweet" ,
    //             payload: result
    //         }) 
    //     }
    // })
}
