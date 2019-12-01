var hashtagService = require('../services/hashtag/hashtag_service');

const messageServiceMap = {
    'GET_TWEET_HASHTAG': hashtagService.getFeed
}

module.exports.handleRequest = function (req, callback) {
    let func = messageServiceMap[req.message];
    console.log("====== RECEIVED REQUEST FOR  " + req.message + "=======");
    console.log(req.body);
    console.log("==================================")
    func(req.body, callback);
};

