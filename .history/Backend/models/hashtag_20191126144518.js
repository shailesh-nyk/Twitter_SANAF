var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hashtagSchema = new Schema({
    hashtag: { type: String, required : true },
    tweetId: { type: Schema.Types.ObjectId, ref: 'tweets' }
})

var TweetModel = mongoose.model('tweets', tweetSchema);

module.exports = TweetModel;