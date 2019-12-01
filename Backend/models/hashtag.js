var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HashtagModel = new Schema({
    hashtag : {type : String},
    tweets : [{ type: Schema.ObjectId, ref: 'tweets' }]
})

var HashtagModel = mongoose.model('hashtags', HashtagModel);

module.exports = HashtagModel;