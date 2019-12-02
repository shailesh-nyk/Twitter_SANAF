var ListModel = require('../../models/lists');
var UserModel = require('../../models/users');

module.exports.subscribeToList = function(req, callback) {
        let updateUser = {
            $push : { lists: req.list_id }
        }
        let updateList = {
            $push : { subscribers: req.user_id }
        }
        UserModel.findByIdAndUpdate(req.user_id, updateUser).exec()
        .then(resp => {
            ListModel.findByIdAndUpdate(req.list_id , updateList, function (err, resp) {
                if(err) {
                    callback(null,{
                        success: false,
                        msg: err.message,
                        payload: err
                    })
                } else{
                    callback(null,{
                        success: true,
                        msg: "Successfully subscribed to the list!",
                        payload: resp
                    }) 
            }
            })
        }) 
        .catch(err => {
            callback(null,{
                success: false,
                msg: "Something went wrong",
                payload: err
            })
        })
};

module.exports.unsubscribeToList = function(req, callback) {
    let updateUser = {
        $pull : { lists: req.list_id }
    }
    let updateList = {
        $pull : { subscribers: req.user_id }
    }
    UserModel.findByIdAndUpdate(req.user_id, updateUser).exec()
    .then(resp => {
        ListModel.findByIdAndUpdate(req.list_id , updateList, function (err, resp) {
            if(err) {
                callback(null,{
                    success: false,
                    msg: err.message,
                    payload: err
                })
            } else{
                callback(null,{
                    success: true,
                    msg: "Successfully unsubscribed to the list!",
                    payload: resp
                }) 
        }
        })
    }) 
    .catch(err => {
        callback(null,{
            success: false,
            msg: "Something went wrong",
            payload: err
        })
    })
};

