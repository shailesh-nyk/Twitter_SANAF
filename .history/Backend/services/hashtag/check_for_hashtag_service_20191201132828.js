var findHashtags = require('find-hashtags');

module.exports.checkForHashtag = function(req,callback){
    var hashtags = findHashtags(req.tweetText);
    callback(null,{
        success: true,
        msg: "Successfully fetched hashtags from tweets" ,
        payload: hashtags
    }) 
}