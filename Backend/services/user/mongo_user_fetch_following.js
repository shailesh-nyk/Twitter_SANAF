const UserModel = require('../../models/users');

module.exports.getFollowing = function (req, callback) {
    const  id  = "5dd302ad593b6b48581b886a";//req.id;
    console.log(id);
    UserModel.findById(id,
        function (err, model) {
            let result = {"success":true, msg:"Following....",result:model.following}
            callback(null, result);
        }
    ).populate('following');
}

module.exports.getFollowedBy = function (req, callback) {
    const  id  = "5dd302ad593b6b48581b886a";//req.id;
    console.log(id);
    UserModel.findById(id,
        function (err, model) {
            let result = {"success":true, msg:"Followed By....",result:model.followedBy}
            callback(null, result);
        }
    ).populate('followedBy');
}