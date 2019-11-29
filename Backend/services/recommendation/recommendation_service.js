var UserModel = require('../../models/users');

module.exports.getRecommendation = function (req, callback) {
    let user_id = req.id;
    UserModel.find({ _id: user_id }, (err, result) => {
        if (err) {
            callback(null, {
                success: false,
                msg: err.message,
                payload: err
            })
        }
        else {
            userIsAlreadyFollowing = JSON.parse(JSON.stringify(result))[0].following;
            userIsAlreadyFollowing.push(user_id);
            UserModel.find({ _id: { $nin: userIsAlreadyFollowing } }, (err, doc) => {
                if (err) {
                    callback(null, {
                        success: false,
                        msg: err.message,
                        payload: err
                    })
                }
                else {
                    callback(null, {
                        success: true,
                        msg: 'Recommendation generated succesfully',
                        payload: JSON.parse(JSON.stringify(doc))
                    });
                }

            }).skip(Math.random() * 100).limit(10);

        }
    });
}

module.exports.handleSearch = function (req, callback) {
    let { query } = req;
    query = new RegExp("^" + query, "i");
    UserModel.find({
        $or: [{ 'name': query },
        { 'handle': query }]
    }, (err, result) => {
        if (err) {
            callback(true, {
                success: false,
                msg: err.message,
                payload: err
            });
        }
        if (result) {
            callback(false, {
                success: true,
                msg: "Search result",
                payload: JSON.parse(JSON.stringify(result))
            });
        }
        else {
            callback(true, {
                success: false,
                msg: err.message,
                payload: err
            });
        }
    }).limit(5);
}

