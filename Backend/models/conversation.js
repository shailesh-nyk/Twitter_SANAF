var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conversationSchema = new Schema({
    users : [{ type: Schema.ObjectId, ref: 'users' }],
    messages : [{
        text : {type : String},
        sender_id : { type: Schema.ObjectId, ref: 'users' },
        sent_at : { type : Date, default: Date.now }
    }]
})

var conversationModel = mongoose.model('conversation', conversationSchema);

module.exports = conversationModel;