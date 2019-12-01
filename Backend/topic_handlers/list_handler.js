var createListService = require('../services/list/create_list_service');

const messageServiceMap = {
    'CREATE_LIST': createListService.createList
}

module.exports.handleRequest = function (req, callback) {
    let func = messageServiceMap[req.message];
    console.log("====== RECEIVED REQUEST FOR  " + req.message + "=======");
    console.log(req.body);
    console.log("==================================")
    func(req.body, callback);
};

