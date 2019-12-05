var ListModel = require('../../models/lists');

module.exports.editListDetails = function(req, callback) {
    let search = {
        "_id": req.list_id
    }
    let update = {
        name: req.name,
        description: req.description,
        isPublic: req.isPublic
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
            msg: "Successfully updated the list details" ,
            payload: result
        }) 
    }
    });
}

