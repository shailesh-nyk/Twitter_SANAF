'use strict'

const UserModel = require('../../models/users');
const TweetModel = require('../../models/tweet');



module.exports.tweetsWithLikes = function(req, callback){

    let result;
    
    TweetModel.find({

    },'likeCount')
    .sort({'likeCount': 'desc' })
    .limit(10)
    .populate( [{ path:'userId', select:'name handle'}])
    .then(tweets=>{

         let arr=[];

         tweets.map((item,index) =>{

             //console.log("Views..", item.views);
               
            let data = {
                        name : item.userId.handle,
                        y    : item.likeCount
                       }

            if(index==0)
              {
                data.sliced = true;
                data.selected = true; 
              }            
               
              arr.push(data);

         });

       //console.log(arr);
        result = { success:true, msg:"Tweets With Likes Count",arr};
        callback(null,result);

    })
    .catch(err => {
        result = { success:false,msg:err.message };
        callback(null,result);
      });
   
                        
};