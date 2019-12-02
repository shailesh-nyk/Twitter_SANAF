var ListModel = require('../../models/lists');

module.exports.removeUser = function(req, callback) {
    let search = {
        "_id": req.list_id
    }
    let update = {
        $pull: {
            "list": req.user_id
        }
    }
    ListModel.findOneAndUpdate(search, update , {safe: true, new: true, useFindAndModify: false}, function(err, result){
    if(err) {
        callback(null,{
            success: false,
            msg: "Something went wrong",
            payload: err
        })
    } else {
        callback(null,{
            success: true,
            msg: "Successfully removed the user" ,
            payload: result
        }) 
    }
    });
}

