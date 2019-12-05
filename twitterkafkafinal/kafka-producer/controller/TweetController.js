'use strict'
const express = require('express')
const router = express.Router()
const cors = require('cors')
router.use(cors());
var kafka = require('../kafka-config/client');
let requestTopicName = 'tweet';
var jwt_decode = require('jwt-decode');


exports.postTweet = (req, res) => {
   
    req = {
        body: req.body,
        message: 'POSTTWEET'
      }

    kafkaRequest(req,res);
    

};

exports.getTweets = (req,res)=>{

    req = {
        body: req.query,
        message: 'GETTWEET'
      }

    kafkaRequest(req,res);
       
}

exports.getUser = (req,res)=>{

    req = {
        body: req.query,
        message: 'GETUSERSTWEETS'
      }

    kafkaRequest(req,res);
       
}

exports.like = (req,res)=>{

    req = {
        body: req.body,
        message: 'LIKETWEET'
      }

    kafkaRequest(req,res);
       
}

exports.delete = (req,res)=>{

    req = {
        body: req.body,
        message: 'UNLIKETWEET'
      }

    kafkaRequest(req,res);
       
}

exports.comment = (req,res)=>{

    req = {
        body: req.body,
        message: 'COMMENTTWEET'
      }

    kafkaRequest(req,res);
       
}

exports.addHashtag = (req,res)=>{

    req = {
        body: req.body,
        message: 'ADDHASHTAG'
      }

    kafkaRequest(req,res);
       
}

exports.view = (req,res)=>{

    req = {
        body: req.body,
        message: 'INCREMENT_VIEW'
      }

    kafkaRequest(req,res);
       
}

exports.bookmark = (req,res)=>{
    req.body['user_id'] = jwt_decode(req.headers.authorization).id;
    req = {
        body: req.body,
        message: 'BOOKMARK_TWEET'
      }

    kafkaRequest(req,res);
       
}

exports.getHashtagTweets = (req,res)=>{

    req = {
        body: req.body,
        message: 'GETHASHTAGTWEETS'
      }

    kafkaRequest(req,res);
       
}

exports.retweet = (req,res)=>{
    req.body['user_id'] = jwt_decode(req.headers.authorization).id;

    req = {
        body: req.body,
        message: 'RETWEET'
      }

    kafkaRequest(req,res);
       
}


let kafkaRequest=(req,res)=>{
    //console.log("Request ",req);
    //req.body.originalUrl = req.originalUrl;
    //req.body.method = req.method;

    kafka.make_request(requestTopicName,req, function(err,results){
     console.log('in result');
     console.log(results);
     if (err){
         console.log("Inside err");
         res.json({
             status:"error",
             msg:"System Error, Try Again."
         })
     }else{
         console.log("Inside else");
             /*res.json({
                 updatedList:results
             });*/
 
             return res.send(results);
 
             //res.end();
         }
     
 });


}

