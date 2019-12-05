'use strict'

var mongoose = require('mongoose');
const UserModel = require('../../models/users');
const TweetModel = require('../../models/tweet');
const moment = require('moment');
  
 

module.exports.tweetsWithProfileViews = function(req, callback){

 let result;
    
    let currDt = moment(Date.now()).add(1,'days').format('YYYY-MM-DD');
    let previousMonth = moment(Date.now()).subtract(30, 'days').format('YYYY-MM-DD');

    console.log("Current Date ", currDt);
	console.log("Previous ", previousMonth);
	console.log("Request",req);
    
 UserModel.aggregate(
  [
    {
      '$unwind' : '$views'
    },
      { "$match": {
          "_id" : mongoose.Types.ObjectId(req.id),
          "views.createdOn": { 
              "$gte": new Date(previousMonth), "$lt": new Date(currDt)
          }
      }},
      { "$group": {
          "_id": {
                  "year":  { "$year": "$views.createdOn" },
                  "month": { "$month": "$views.createdOn" },
                  "day":   { "$dayOfMonth": "$views.createdOn" }
                }
          /*"id": { 
                 "$addToSet": "$_id",
                 "year":  { "$year": "$createdOn" },
                 "month": { "$month": "$createdOn" },
                 "day":   { "$dayOfMonth": "$createdOn" }
                }*/,
            /*'views': { 
                '$addToSet': '$views' 
            },*/
            "count": { "$sum": 1 } 
      }},

    { $sort: { _id: 1 } }
   ])
    .then(tweets=>{
         let arr=[];
console.log("Tweets....",tweets);
         tweets.map((item,index) =>{

            let newArr = [];
            newArr.push(item._id.year+"-"+item._id.month+"-"+item._id.day);
            newArr.push(item.count);

            arr.push(newArr);

         });

        //console.log(arr);
        result = { success:true, msg:"Tweets Profile Views : ",arr};
        callback(null,result);

    })
    .catch(err => {
        result = { success:false,msg:err.message };
        callback(null,result);
      });
   
                      
};