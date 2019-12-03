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

db.collection.bulkWrite( [
    { updateOne :
       {
          "filter": <document>,
          "update": <document or pipeline>,            // Changed in 4.2
          "upsert": <boolean>,
          "collation": <document>,                     // Available starting in 3.4
          "arrayFilters": [ <filterdocument1>, ... ],  // Available starting in 3.6
          "hint": <document|string>                    // Available starting in 4.2.1
       }
    }
 ] )