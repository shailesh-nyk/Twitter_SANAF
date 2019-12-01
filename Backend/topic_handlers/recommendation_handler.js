var recommendationService = require('../services/recommendation/recommendation_service');

const messageServiceMap = {
    'GET_RECOMMENDATION': recommendationService.getRecommendation,
    'GET_SEARCH_RESULTS': recommendationService.handleSearch
}

module.exports.handleRequest = function (req, callback) {
    let func = messageServiceMap[req.message];
    console.log("====== RECEIVED REQUEST FOR  " + req.message + "=======");
    console.log(req.body);
    console.log("==================================")
    func(req.body, callback);
};

