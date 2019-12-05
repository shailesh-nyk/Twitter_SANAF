var UserModel = require('../../models/users');
var TweetModel = require('../../models/tweet');
var HashtagModel = require('../../models/hashtag');
var ListModel = require('../../models/lists');

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
    Promise.all([
        UserModel.find({
            $or: [{ 'name': query },
            { 'handle': query }]
        }).limit(5),
        HashtagModel.find({
            'hashtag': query
        }).limit(5),
        ListModel.find({
            'name': query,
            'isPublic': true
        }).limit(5)

    ])
        .then(results => {
            let result = [];
            let user_results = [...results[0]];
            let hashtag_results = JSON.parse(JSON.stringify([...results[1]]));
            let list_results = [...results[2]];

            hashtag_results = hashtag_results.map(function (obj) {
                obj['name'] = obj['hashtag'];
                delete obj['hashtag'];
                return obj;
            });

            result.push(...user_results);
            result.push(...hashtag_results);
            result.push(...list_results)

            callback(false, {
                success: true,
                msg: "Search result",
                payload: result
            });
        })
        .catch(err => {
            callback(true, {
                success: false,
                msg: err.message,
                payload: err
            });
        })
}

