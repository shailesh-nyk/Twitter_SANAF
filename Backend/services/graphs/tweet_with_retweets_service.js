'use strict'

const UserModel = require('../../models/users');
const TweetModel = require('../../models/tweet');



module.exports.tweetsWithRetweets = function(req, callback){

    let result;
    
    TweetModel.find({

    },'retweetsCount')
    .sort({'retweetsCount': 'desc' })
    .limit(5)
    .populate( [{ path:'userId', select:'name handle'}])
    .then(tweets=>{

         let arr=[];

         tweets.map((item,index) =>{

             //console.log("Views..", item.views);
               
            /*let data = {
                        name : item.userId.handle,
                        y    : item.retweetsCount
                       }

            if(index==0)
              {
                data.sliced = true;
                data.selected = true; 
              }*/            
               
         
            let newArr = [];
            newArr.push(item.userId.handle);
            newArr.push(item.retweetsCount);

            arr.push(newArr);

            //arr.push(data);

         });

       //console.log(arr);
        result = { success:true, msg:"Tweets With Retweets Count",arr};
        callback(null,result);

    })
    .catch(err => {
        result = { success:false,msg:err.message };
        callback(null,result);
      });
   
                        
};