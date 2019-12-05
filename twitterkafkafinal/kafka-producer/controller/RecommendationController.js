'use strict'
const express = require('express')
const router = express.Router()
const cors = require('cors')
router.use(cors());
var kafka = require('../kafka-config/client');
let requestTopicName = 'recommendation';
var jwt_decode = require('jwt-decode');

exports.getRecommendations = (req, res) => {
   
    req = {
        body: req.query,
        message: 'GET_RECOMMENDATION'
      }

    kafkaRequest(req,res);
    

};

exports.search = (req,res)=>{

    req = {
        body: req.query,
        message: 'GET_SEARCH_RESULTS'
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

