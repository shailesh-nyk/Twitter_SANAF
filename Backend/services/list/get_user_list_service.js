var ListModel = require('../../models/lists');
var UserModel = require('../../models/users');

module.exports.getUserList = function(req, callback){
        UserModel.findById(req.user_id, 'lists', function (err, resp) {
            if(err) {
                callback(null,{
                    success: false,
                    msg: err.message,
                    payload: err
                })
            } else{
                callback(null,{
                    success: true,
                    msg: "Fetched the user lists!",
                    payload: resp
                }) 
        }
        })
        .populate({ path:'lists', populate: { path:'createdBy', select:'name handle avatar' }})
};


