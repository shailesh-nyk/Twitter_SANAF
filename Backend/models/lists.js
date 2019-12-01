var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listSchema = new Schema({
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
    name: { type: String },
    list: [{ type: Schema.Types.ObjectId, ref: 'user' }],  
    description: { type: String },
    isPublic: {type: Boolean},
    subscribers: [{ type: Schema.Types.ObjectId, ref: 'user' }]
},
    {
        timestamps: true
    })

var ListModel = mongoose.model('lists', listSchema);

module.exports = ListModel;