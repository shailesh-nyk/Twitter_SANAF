const UserModel = require('../../models/users');
var utils = require('./../../middleware/utils');

module.exports.unfollow = function (req, callback) {
    const { user_id, follow_id } = req;
    UserModel.findByIdAndUpdate(
        user_id,
        { $pull: { "following": follow_id } },
        { safe: true, upsert: true, new: true },
        function (err, model) {
            UserModel.findByIdAndUpdate(
                follow_id,
                { $pull: { "followedBy": user_id } },
                { safe: true, upsert: true, new: true },
                function (err, model) {
                    utils.invalidateUserRedis(user_id);
                    callback(null, model);
                }
            );
        }
    );
}