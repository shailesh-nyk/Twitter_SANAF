var TweetModel = require('../../models/tweet');

module.exports.incrementViewCount = function(req, callback) {
    let search = {
        "_id": req.id
    }
    let update = {
        $inc: {
            "views": 1
        }
    }
    TweetModel.findOneAndUpdate(search, update , {safe: true, new: true, useFindAndModify: false}, function(err, result){
    if(err) {
        callback(null,{
            success: false,
            msg: "Something went wrong",
            payload: err
        })
    } else {
        callback(null,{
            success: true,
            msg: "Successfully incremented the tweet view count" ,
            payload: result
        }) 
    }
    });
}