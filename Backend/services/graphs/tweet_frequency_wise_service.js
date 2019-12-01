'use strict'

const UserModel = require('../../models/users');
const TweetModel = require('../../models/tweet');



module.exports.tweetsFrequencyWiseDaily = function(req, callback){

    let result;
    
TweetModel.aggregate(
  [
      /*{ "$match": {
          "postedOn": { 
              "$gte": new Date("2019-10-17"), "$lt": new Date("2019-12-01")
          }
      }},
      { "$group": {
          "_id": "null",
          "count": { "$sum": 1 }
      }}*/

    { "$match": {
        "postedOn": { 
            "$gte": new Date("2019-11-01"), "$lt": new Date("2019-11-30")
        }
    }},
    { "$group": {
        "_id": { 
            "year":  { "$year": "$postedOn" },
            "month": { "$month": "$postedOn" },
            "day":   { "$dayOfMonth": "$postedOn" }
        },
        "count": { "$sum": 1 }
    }},
    { $sort: { _id: 1 } }
   ])
    .then(tweets=>{

         let arr=[];

         tweets.map((item,index) =>{

            let newArr = [];
            newArr.push(item._id.year+"-"+item._id.month+"-"+item._id.day);
            newArr.push(item.count);

            arr.push(newArr);

         });

        //console.log(arr);
        result = { success:true, msg:"Tweets Frequency Wise : Daily",arr};
        callback(null,result);

    })
    .catch(err => {
        result = { success:false,msg:err.message };
        callback(null,result);
      });
   
                        
};


//For Monthly
module.exports.tweetsFrequencyWiseMonthly = function(req, callback){

  let result;
  
TweetModel.aggregate(
[
   { "$match": {
      "postedOn": { 
          "$gte": new Date("2019-10-01"), "$lt": new Date("2019-12-01")
      }
  }},
  { "$group": {
      "_id": { 
          "year":  { "$year": "$postedOn" },
          "month": { "$month": "$postedOn" }
      },
      "count": { "$sum": 1 }
  }},
  { $sort: { _id: 1 } }
])
  .then(tweets=>{

       let arr=[];

         tweets.map((item,index) =>{

            let newArr = [];
            newArr.push(item._id.year+"-"+item._id.month);
            newArr.push(item.count);

            arr.push(newArr);

         });

      result = { success:true, msg:"Tweets Frequency Wise : Monthly",arr};
      callback(null,result);

  })
  .catch(err => {
      result = { success:false,msg:err.message };
      callback(null,result);
    });
 
                      
};

//For Hourly
module.exports.tweetsFrequencyWiseHourly = function(req, callback){

  let result;
  
TweetModel.aggregate(
[
   { "$match": {
      "postedOn": { 
          "$gte": new Date("2019-10-17"), "$lt": new Date("2019-10-18")
      }
  }},
  { "$group": {
      "_id": { 
          "hour":  { "$hour": "$postedOn" },
          //"month": { "$month": "$postedOn" }
      },
      "count": { "$sum": 1 }
  }},
  { $sort: { _id: 1 } }
])
  .then(tweets=>{

       let arr=[];

         tweets.map((item,index) =>{

            let newArr = [];
            newArr.push(item._id.hour+":00"+"-"+(item._id.hour+1)+":00");
            newArr.push(item.count);

            arr.push(newArr);

         });

      result = { success:true, msg:"Tweets Frequency Wise : Hourly",arr};
      callback(null,result);

  })
  .catch(err => {
      result = { success:false,msg:err.message };
      callback(null,result);
    });
 
                      
};