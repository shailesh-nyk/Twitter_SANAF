var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listSchema = new Schema({
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
    name: { type: String },
    list: [],  
    description: { type: String },
    isPublic: {type: Boolean},
    subscriberCount: {type: Number, default: 0}
},
{
    timestamps: true
})

var ListModel = mongoose.model('lists', listSchema);

module.exports = ListModel;