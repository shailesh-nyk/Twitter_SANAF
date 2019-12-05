const UserModel = require('../../models/users');

module.exports.getFollowing = function (req, callback) {
    const id = req.id;
    //console.log("Request Body ",req);
    UserModel.findById(id,
        function (err, model) {
            let result = { "success": true, msg: "Following....", result: model.following }
            callback(null, result);
        }
    ).populate('following').distinct();
}


module.exports.getFollowers = function (req, callback) {
    const id = req.id;
    UserModel.findById(id, 'followedBy',
        function (err, model) {
            callback(null, model.followedBy);
        }
    ).lean();

}

module.exports.getFollowedBy = function (req, callback) {
    const id = req.id;
    console.log(id);
    UserModel.findById(id,
        function (err, model) {
            let result = { "success": true, msg: "Followed By....", result: model.followedBy }
            callback(null, result);
        }
    ).populate('followedBy');
}


module.exports.getFollowersNew = function (req, callback) {
    const id = req.user_id;
    console.log(id);
    UserModel.findById(id,
        function (err, model) {
            let result = { "success": true, msg: "Followed By....", result: model.followedBy }
            callback(null, result);
        }
    ).populate('followedBy');
}


module.exports.getFollowingNew = function (req, callback) {
    const id = req.user_id;
    //console.log("Request Body ",req);
    UserModel.findById(id,
        function (err, model) {
            let result = { "success": true, msg: "Following....", result: model.following }
            callback(null, result);
        }
    ).populate('following').distinct();
}