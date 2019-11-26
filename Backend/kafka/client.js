// var rpc = new (require('./kafkarpc'))();
var rpc = require('../kafka/proxyRPC');

//make request to kafka
// function mk_request(queue_name, msg_payload, callback){
//     console.log('in make request');
//     console.log(msg_payload);
// 	rpc.makeRequest(queue_name, msg_payload, function(err, response){
// 		if(err)
// 			console.error(err);
// 		else{
// 			console.log("response", response);
// 			callback(null, response);
// 		}
// 	});
// }

//PROXY FOR KAFKA (DEV)
function mk_request(topic_name, msg_payload, callback){ 
	rpc.handleTopicRequest(topic_name, msg_payload, function(err, response){
		if(err)
			console.error(err);	
		else{
			callback(null, response);
		}
	});
}

module.exports.make_request = function(topic, payload ,res){
	mk_request(topic, payload, function(err, result){
		console.log('in result');
		console.log(result);
		if (err){
			console.log("Inside err");
			res.send(result);
		}else{
			res.send(result) ;
		}	
	})
}
