var conversationService = require('../services/conversation/conversation_service');

const messageServiceMap = {
    'GET_CONVERSATION_HEADS' : conversationService.getHeads,
    'SEND_MESSAGE' : conversationService.send,
}

module.exports.handleRequest = function(req, callback){
     let func = messageServiceMap[req.message];
     console.log("====== RECEIVED REQUEST FOR  " + req.message + "=======");
     console.log(req.body);
     console.log("==================================")
     func(req.body, callback);
};

