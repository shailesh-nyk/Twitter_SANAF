var connection =  new require('./kafka-config/connection');
//topics files
//var signin = require('./services/signin.js');

// Configuring the database
const db_config = require('./config/db_config.js');

db_config.connectDB();

//var Users = require('./services/UserService.js');
var user_handler = require('./topic_handlers/user_handler');
var conversation_handler = require('./topic_handlers/conversation_handler');
var tweet_handler = require('./topic_handlers/tweet_handler');
var recommendation_handler = require('./topic_handlers/recommendation_handler');
var list_handler = require('./topic_handlers/list_handler');
var hashtag_handler = require('./topic_handlers/hashtag_handler');
var graph_handler = require('./topic_handlers/graph_handler');


function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' , topic_name +" ", fname);
        console.log("Message ",JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname(data.data, function(err,res){ 
            console.log('after handle',res);
            console.log('after handle data',data);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request


handleTopicRequest("user", user_handler.handleRequest);
handleTopicRequest("conversation", conversation_handler.handleRequest)
handleTopicRequest("tweet", tweet_handler.handleRequest)
handleTopicRequest("recommendation", recommendation_handler.handleRequest)
handleTopicRequest("list", list_handler.handleRequest)
handleTopicRequest("hashtag", hashtag_handler.handleRequest)
handleTopicRequest("graphs", graph_handler.handleRequest)