const UserModel = require('../../models/users');

module.exports.unfollow = function (req, callback) {
    const { user_id, follow_id } = req;
    UserModel.findByIdAndUpdate(
        user_id,
        { $pull: { "following": follow_id } },
        { safe: true, upsert: true, new: true },
        function (err, model) {
            callback(null,model);
        }
    );
}