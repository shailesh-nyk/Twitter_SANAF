var userHandler = require('../topic_handlers/user_handler');
var conversationHandler = require('../topic_handlers/conversation_handler');


module.exports.handleTopicRequest = function(topic_name, payload, callback ) {
        let fname;
        switch(topic_name) {
            // Add your TOPICs here
            //first argument is topic name
            //second argument is a function that will handle this topic request
            case "user" : {
                fname = userHandler.handleRequest ;  break; 
            }
            case "conversation" : {
                fname = conversationHandler.handleRequest ;  break; 
            }
            default: break;
        }
        fname(payload, callback);
}
