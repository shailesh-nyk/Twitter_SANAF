'use strict'
const express = require('express')
const router = express.Router()
const cors = require('cors')
router.use(cors());
var kafka = require('../kafka-config/client');
let requestTopicName = 'list';
var jwt_decode = require('jwt-decode');

exports.createList = (req, res) => {
   
    req = {
        body: req.query,
        message: 'CREATE_LIST'
      }

    kafkaRequest(req,res);
    

};

exports.getLists = (req,res)=>{

    req = {
        body: req.query,
        message: 'GET_USER_LIST'
      }

    kafkaRequest(req,res);
       
}

exports.details = (req,res)=>{

    req = {
        body: req.query,
        message: 'LIST_DETAILS'
      }

    kafkaRequest(req,res);
       
}

exports.deleteMember = (req,res)=>{

    req = {
        body: req.query,
        message: 'REMOVE_USER'
      }

    kafkaRequest(req,res);
       
}

exports.editList = (req,res)=>{

    req = {
        body: req.query,
        message: 'EDIT_LIST'
      }

    kafkaRequest(req,res);
       
}

exports.subscribe = (req,res)=>{

    req = {
        body: req.query,
        message: 'SUBSCRIBE_LIST'
      }

    kafkaRequest(req,res);
       
}

exports.unsubscribe = (req,res)=>{

    req = {
        body: req.query,
        message: 'UNSUBSCRIBE_LIST'
      }

    kafkaRequest(req,res);
       
}

exports.member = (req,res)=>{

    req = {
        body: req.query,
        message: 'ADD_MEMBER'
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

