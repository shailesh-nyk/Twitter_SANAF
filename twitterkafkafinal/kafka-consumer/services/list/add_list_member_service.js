var ListModel = require('../../models/lists');

module.exports.addMember = function(req, callback) {
    let search = {
        "_id": req.list_id
    }
    let update = {
        $push: {
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
            msg: "Successfully added the user to your list" ,
            payload: result
        }) 
    }
    });
}

