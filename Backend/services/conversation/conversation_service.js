var mongoose = require('mongoose');
var ConversationModel = require('../../models/conversation');
var UserModel = require('../../models/users')


module.exports.getHeads = function (req, callback) {
    let user_id = mongoose.Types.ObjectId("5dca4f4de9a22e4b5c966d34");
    ConversationModel.find({ users: user_id }, (err, result) => {
        if (err) {
            callback(null, {
                success: false,
                msg: "Something went wrong",
                msgDesc: err
            })
        }
        else if (result) {
            callback(null, {
                success: true,
                msg: "Successfully fetched the conversation heads",
                msgDesc: result
            })
        }

    }).populate('users messages.sender_id');
};
sendMessage = (socket, text) => {
    socket.emit('private', { message: text });
}
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
    ConversationModel.findOne({ users: users }, (err, result) => {
        if (err) {
            callback(null, {
                success: false,
                msg: err.message,
                payload: err
            })
        }
        if (result) {
            result.messages.push(messageObj);
            result.save();
            callback(null, {
                success: true,
                msg: "Message sent successfully!",
                payload: result
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
                    callback(null, {
                        success: true,
                        msg: "Message sent successfully!",
                        payload: resp
                    })
                }
            });
        }
    });

    let receiverSocket = req.socket["userid"];
    if (receiverSocket)
        this.sendMessage(receiverSocket, message);
};
