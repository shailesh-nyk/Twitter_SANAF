'use strict'
const express = require('express')
const router = express.Router()
const cors = require('cors')
router.use(cors());
var kafka = require('../kafka-config/client');
let requestTopicName = 'graphs';
var jwt_decode = require('jwt-decode');


exports.tweets_with_views = (req, res) => {
   
    req = {
        body: req.query,
        message: 'TWEETS_WITH_VIEWS'
      }

    kafkaRequest(req,res);
    

};

exports.tweets_with_likes = (req, res) => {
   
    req = {
        body: req.query,
        message: 'TWEETS_WITH_LIKES'
      }

    kafkaRequest(req,res);
    

};

exports.tweets_with_retweets = (req, res) => {
   
    req = {
        body: req.query,
        message: 'TWEETS_WITH_RETWEETS'
      }

    kafkaRequest(req,res);
    

};

exports.tweets_frequency_wise_daily = (req, res) => {
   
    req = {
        body: req.query,
        message: 'TWEETS_FREQUENCY_WISE_DAILY'
      }

    kafkaRequest(req,res);
    

};

exports.tweets_frequency_wise_monthly = (req, res) => {
   
    req = {
        body: req.query,
        message: 'TWEETS_FREQUENCY_WISE_MONTHLY'
      }

    kafkaRequest(req,res);
    

};

exports.tweets_frequency_wise_hourly = (req, res) => {
   
    req = {
        body: req.query,
        message: 'TWEETS_FREQUENCY_WISE_HOURLY'
      }

    kafkaRequest(req,res);
    

};

exports.tweets_with_profile_views = (req, res) => {
   
    req = {
        body: req.user,
        message: 'TWEETS_WITH_PROFILE_VIEWS'
      }

    kafkaRequest(req,res);
    

};




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

