var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({

  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    default: null
  },
  state: {
    type: String,
    default: null
  },
  zip: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: null
  },
  password: {
    type: String,
    required: true,
  },
  phone_no: {
    type: String,
    default: null
  },
  avatar: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  handle: {
    type: String,
    default: null
  },
  d_o_b: {
    type: String,
    default: null
  },
  following: [{ type: Schema.ObjectId, ref: 'user' }],
  bookmarks: []
},
  {
    timestamps: true
  }
);

var UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;