var userHandler = require('../topic_handlers/user_handler');
var conversationHandler = require('../topic_handlers/conversation_handler');
var tweetHandler = require('../topic_handlers/tweet_handler');
var graphHandler = require('../topic_handlers/graph_handler');

var recommendationHandler = require('../topic_handlers/recommendation_handler');
var hashtagHandler = require('../topic_handlers/hashtag_handler');
var listHandler = require('../topic_handlers/list_handler');

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
            case "tweet" : {
                fname = tweetHandler.handleRequest ;  break; 
            }
            case "graphs" : {
                fname = graphHandler.handleRequest ;  break; 
            }

            case "recommendation" : {
                fname = recommendationHandler.handleRequest ;  break; 
            }
            case "hashtag" : {
                fname = hashtagHandler.handleRequest ;  break; 
            }
            case "list" : {
                fname = listHandler.handleRequest ;  break; 
            }
            default: break;
        }
        fname(payload, callback);
}
