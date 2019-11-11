var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    status: { type: String , required: true, default: "new"},
    order_ts: { type: Date , required: true },
    rest_id: { type: String , required: true },
    cust_id: { type: String , required: true },
    rest_details: {},
    cust_details: {},
    items: { type: Array },
    total : { type: Number },
    messages: [{
        timestamp: { type: Date },
        message: { type: String },
        senderName: {type: String},
        senderType: {type: String},
    }]
})
orderSchema.pre('save', function(next) {
    this.order_ts = Date.now();
    next();
});
var OrderModel = mongoose.model('orders', orderSchema);

module.exports = OrderModel;