var ListModel = require('../../models/lists');
var UserModel = require('../../models/users');

module.exports.createList = function(req, callback){
        let newList = new ListModel({
            createdBy: req.user,
            name: req.name,
            list: req.list,
            description: req.description,
            isPublic: req.isPublic
        })
        newList.save(function (err, resp) {
            if(err) {
                callback(null,{
                    success: false,
                    msg: err.message,
                    payload: err
                })
            } else{
                callback(null,{
                    success: true,
                    msg: "Created the list successfully!",
                    payload: resp
                }) 
                addListToUsers(resp.id , req.user);
        }
        }); 
};

function addListToUsers(listId, user) {
    let search = {
        _id : user
    }
    let update = {
        $push : {
            lists : listId
        }
    }
    UserModel.findOneAndUpdate(search, update , { safe: true, new: false, useFindAndModify: false }, function(err, result){
        if(err) {
            console.log("ERROR WHILE UPDATING =============================")
        } else {
            console.log("UPDATED SUCCESSFULLY =============================")
        }
    });
}
