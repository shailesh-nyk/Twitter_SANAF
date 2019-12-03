module.exports.checkForHashtag = function(req,callback){
    var tweetText = req.tweetText;
    var expForHashtag = /(#[a-z0-9\-_]*)/ig;
    var hashtagList = expForHashtag.exec(tweetText);
    console.log(hashtagList)
    callback(null,{
        success: true,
        msg: "Successfully fetched hashtags from tweets" ,
        payload: hashtagList
    }) 
}