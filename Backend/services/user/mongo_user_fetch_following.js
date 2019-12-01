const UserModel = require('../../models/users');

module.exports.getFollowing = function (req, callback) {
    console.log("following aish")
    console.log(req)
    const  id  = req._id;
    console.log(id);
    UserModel.findById(id,
        function (err, model) {
            callback(null, model.following);
        }
    ).populate('following');
}