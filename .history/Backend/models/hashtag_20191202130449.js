var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hashtagSchema = new Schema({
    hashtag: { type: String, required : true,unique : true },
    tweets: [{ type: Schema.Types.ObjectId, ref: 'tweets' }]
})

var HashtagModel = mongoose.model('hashtags', hashtagSchema);

module.exports = HashtagModel;