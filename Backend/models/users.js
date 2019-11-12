var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: { type: String },
    handle: {type: String}
})

var UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;