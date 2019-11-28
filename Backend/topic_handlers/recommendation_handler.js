var recommendationService = require('../services/recommendation/recommendation_service');

const messageServiceMap = {
    'GET_RECOMMENDATION': recommendationService.getRecommendation,
}

module.exports.handleRequest = function (req, callback) {
    let func = messageServiceMap[req.message];
    console.log("====== RECEIVED REQUEST FOR  " + req.message + "=======");
    console.log(req.body);
    console.log("==================================")
    func(req.body, callback);
};

