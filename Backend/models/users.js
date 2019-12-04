var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const timeZone = require('mongoose-timezone');

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
    default: "no-dp.png"
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
  followedBy: [{ type: Schema.ObjectId, ref: 'user' }],
  views: [{
    user: { type: Schema.Types.ObjectId, ref: 'user'},
    createdOn: { type: Date }
  }],      
 
  bookmarks: [],
  lists: [{ type: Schema.ObjectId, ref: 'lists' }],
  accountStatus: {
    type: String,
    enum:['active','deactive'],
    default:'active'
  }
},
  {
    timestamps: true
  }
);

userSchema.plugin(timeZone, { paths: ['timestamps','views.createdOn'] });
var UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;