var mongoose = require('mongoose');
var UserModel = require('../../models/users');
var Redis = require("ioredis");
var UserModel = require('../../models/users');

module.exports.getRecommendation = function (req, callback) {
    let user_id = mongoose.Types.ObjectId('5dd2362783758161341f5c60');
    UserModel.find({ _id: user_id }, (err, result) => {
        if (err) {
            callback(null, {
                success: false,
                msg: err.message,
                payload: err
            })
        }
        else {
            userIsAlreadyFollowing = JSON.parse(JSON.stringify(result))[0].following;
            userIsAlreadyFollowing.push(user_id);
            UserModel.find({ _id: { $nin: userIsAlreadyFollowing } }, (err, doc) => {
                if (err) {
                    callback(null, {
                        success: false,
                        msg: err.message,
                        payload: err
                    })
                }
                else {
                    callback(null, JSON.parse(JSON.stringify(doc)));
                }

            }).skip(Math.random() * 100).limit(10);
        }
    });
}

