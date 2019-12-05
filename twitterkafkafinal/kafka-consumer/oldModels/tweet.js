var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tweetSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    text: { type: String },
    image: { type: String, default: null },
    likes: [],
    retweetCount: [],
    parent_id: { type: Schema.Types.ObjectId, ref: 'tweet', default: null },
    comments: [{
        text: {type: String},
        user: { type: Schema.Types.ObjectId, ref: 'users'},
        postedOn: { type: Date }
    }],
    postedOn: { type: Date}
})

tweetSchema.pre('save', function(next) {
    this.postedOn = Date.now();
    next();
});

var TweetModel = mongoose.model('tweets', tweetSchema);

module.exports = TweetModel;