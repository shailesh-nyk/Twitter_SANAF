'use strict'
const express = require('express')
const router = express.Router()
const cors = require('cors')
router.use(cors());
var kafka = require('../kafka-config/client');
let requestTopicName = 'user';
const jwtExpiryInSeconds = 600000;
var jwt_decode = require('jwt-decode');

//User Registration
exports.register = (req, res) => {
   
    req = {
        body: req.body,
        message: 'USER_REGISTRATION'
      }

    kafkaRequest(req,res);
    

};

exports.login = (req,res)=>{
console.log("In User body", req);
    req = {
        body: req.body,
        message: 'USER_LOGIN'
      }

    kafkaRequest(req,res);
       
}


exports.getUserProfile = (req,res)=>{

    //req.body.payLoad = req.payLoad;
  
    req = {
        body: req.query,
        message: 'USER_PROFILE_GET'
      }


    kafkaRequest(req,res);
        
}

//Edit User Profile Details
exports.userImageUpdate = (req,res)=>{
  
    //req.body.payLoad = req.payLoad;

    req = {
        body: req.body,
        message: 'USER_IMAGE_UPDATION'
      }

    kafkaRequest(req,res);
}

//Edit User Profile Details
exports.editUserProfile = (req,res)=>{
  
    //req.body.payLoad = req.payLoad;

    req = {
        body: req.body,
        message: 'USER_PROFILE_UPDATION'
      }

    kafkaRequest(req,res);
}


exports.newsfeed = (req,res)=>{
  let user_id = jwt_decode(req.headers.authorization).id;
    //req.body.payLoad = req.payLoad;

    req = {
        body: { user_id : user_id },
        message: 'GET_NEWS_FEED'
      }

    kafkaRequest(req,res);
}

exports.follow = (req,res)=>{
  
    //req.body.payLoad = req.payLoad;

    req = {
        body: req.body,
        message: 'FOLLOW'
      }

    kafkaRequest(req,res);
}

exports.unfollow = (req,res)=>{
  
    //req.body.payLoad = req.payLoad;

    req = {
        body: req.body,
        message: 'UNFOLLOW'
      }

    kafkaRequest(req,res);
}

exports.following = (req,res)=>{
  
    //req.body.payLoad = req.payLoad;

    req = {
        body: req.user,
        message: 'FOLLOWING'
      }

    kafkaRequest(req,res);
}

exports.followers = (req,res)=>{
  
    //req.body.payLoad = req.payLoad;

    req = {
        body: req.query,
        message: 'FOLLOWERS'
      }

    kafkaRequest(req,res);
}

exports.followedBy = (req,res)=>{
  
    //req.body.payLoad = req.payLoad;

    req = {
        body: req.user,
        message: 'FOLLOWED_BY'
      }

    kafkaRequest(req,res);
}

exports.bookmark = (req,res)=>{
  
    //req.body.payLoad = req.payLoad;
    let user_id = jwt_decode(req.headers.authorization).id;
    
    req = {
        body: { user_id : user_id },
        message: 'GET_BOOKMARKS'
      }

    kafkaRequest(req,res);
}

exports.deactivateAccount = (req,res)=>{
  
    //req.body.payLoad = req.payLoad;

    req = {
        body: req.user,
        message: 'USER_ACCOUNT_DEACTIVATE'
      }

    kafkaRequest(req,res);
}

exports.incrementViewCount = (req,res)=>{
  
    //req.body.payLoad = req.payLoad;

    req = {
        body: req.body,
        message: 'USER_VIEW_INCREMENT'
      }

    kafkaRequest(req,res);
}

exports.followersnew = (req,res)=>{
  
    //req.body.payLoad = req.payLoad;

    req = {
        body: req.query,
        message: 'FOLLOWERS_NEW'
      }

    kafkaRequest(req,res);
}

exports.followingnew = (req,res)=>{
  
    //req.body.payLoad = req.payLoad;

    req = {
        body: req.query,
        message: 'FOLLOWING_NEW'
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
 
             if(results.hasOwnProperty("token"))
                  res.cookie('token', results.token, { maxAge: jwtExpiryInSeconds * 100000});

             return res.send(results);
 
             //res.end();
         }
     
 });


}

