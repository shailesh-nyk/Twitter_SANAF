'use strict'
var TweetModel = require('../../models/tweet');
const followerModel = require('../../models/sql/Follower');
const jwt = require('jsonwebtoken');

process.env.SECRET_KEY = 'secret';


module.exports.getNewsFeedDummy = function(req, callback){
    TweetModel.find({ "user.name": req.name },function (err, result) {
    if (err) {
        callback(null, {
                success: false,
                msg: "Something went wrong",
                payload: err
        })
    }
    else if(result) {
        callback(null,{
            success: true,
            msg: "Successfully fetched the tweet" ,
            payload: result
        }) 
    } 
    }).populate('user');
};

var getToken = (token) => {
    return token.substr(7);
}

module.exports.getNewsFeed = function(req,callback) {
    var token = getToken(req.headers.authorization);
    var payload = jwt.verify(token, process.env.SECRET_KEY);
    var userId = payload.id;
    getFollowingList(userId)
    .then( (followingList) => {
        TweetModel.find({ "user.id" : { $in : followingList}},function (err, result) {
            if (err) {
                callback(null, {
                        success: false,
                        msg: "Something went wrong",
                        payload: err
                })
            }
            else if(result) {
                callback(null,{
                    success: true,
                    msg: "Successfully fetched the tweet" ,
                    payload: result
                }) 
            } 
        })
    })
    .catch(err => {
        result = { success:false,msg:err.message };
        callback(null,result);
      });
}

var getFollowingList = (userId) => {
    return new Promise(function(resolve,reject){
        followerModel.findAll({ 
            where : { FolloweID : userId},
            attributes : {UserID}
        }).then( (results) => {
            var followingList = results.dataValues.UserID;
            resolve(followingList);
        }).catch( (err) => {
            reject(err.message);
        })

    })
}