const UserModel = require('../../models/users');

module.exports.follow = function (req, callback) {
    const { user_id, follow_id } = req;
    UserModel.findByIdAndUpdate(
        user_id,
        { $push: { "following": follow_id } },
        { safe: true, upsert: true, new: true },
        function (err, model) {

            console.log("Hello",model);
            _id = follow_id;
            
            UserModel.findByIdAndUpdate(
                _id
            ,
            { $push: { "followedBy": user_id } },
            { safe: true, upsert: true, new: true },
            function(err, model) {
                
            })
            callback(null,model);
        }
    );
}