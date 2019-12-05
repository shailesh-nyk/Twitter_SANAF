var mongoose = require('mongoose');
var ConversationModel = require('../../models/conversation');
var UserModel = require('../../models/users');
var Redis = require("ioredis");
var redis = new Redis(6379, "54.172.121.236", { password: "kafkasucks" });

module.exports.getHeads = function (req, callback) {
    let user_id = req.id  //mongoose.Types.ObjectId("5dd2362783758161341f5c60");
    // redis.exists("conversation_heads" + user_id).then((exists) => {
    //     if (exists === 1) {
    //         redis.get("conversation_heads" + user_id, function (err, result) {
    //             callback(null, {
    //                 success: true,
    //                 msg: "Succesfully fetched the conversation heads from redis",
    //                 msgDesc: JSON.parse(result)
    //             })
    //         });
    //     }
    //     else {
    ConversationModel.find({ users: { $in: user_id } }, (err, result) => {
        if (err) {
            callback(null, {
                success: false,
                msg: "Something went wrong",
                msgDesc: err
            })
        }
        else if (result) {
            //redis.set("conversation_heads" + user_id, JSON.stringify(result));
            callback(null, {
                success: true,
                msg: "Successfully fetched the conversation heads",
                msgDesc: JSON.parse(JSON.stringify(result))
            })
        }
    }).populate('users messages.sender_id');
}

//     })
// };

module.exports.send = function (req, callback) {
    let { users, message } = req;
    let messageObj = {
        text: message,
        sender_id: users[0],
    }
    let newMessage = new ConversationModel({
        users: users,
        messages: [messageObj]
    });
    ConversationModel.findOne({ users: { $all: users } }, (err, result) => {
        if (err) {
            callback(null, {
                success: false,
                msg: err.message,
                payload: err
            })
        }
        if (result) {
            result.messages.push(messageObj);
            result.save(function (err, resp) {
                //redis.del("conversation_heads" + users[0]);
                callback(null, {
                    success: true,
                    msg: "Message sent successfully!",
                    payload: resp
                });
            });
        }
        else {
            newMessage.save(function (err, resp) {
                if (err) {
                    callback(null, {
                        success: false,
                        msg: err.message,
                        payload: err
                    })
                } else {
                    //redis.set("conversation_heads" + users[0], JSON.stringify(resp));
                    callback(null, {
                        success: true,
                        msg: "Message sent successfully!",
                        payload: resp
                    })
                }
            });
        }
    });
};

module.exports.createConvHead = function (req, callback) {
    let { users } = req;
    let newMessage = new ConversationModel({
        users: users,

    });
    newMessage.save(function (err, resp) {
        if (err) {
            callback(null, {
                success: false,
                msg: err.message,
                payload: err
            })
        } else {
            //redis.set("conversation_heads" + users[0], JSON.stringify(resp));
            callback(null, {
                success: true,
                msg: "Message thread created successfully!",
                payload: resp
            })
        }
    });
}
