
var TweetModel = require('../../models/tweet');
const followerModel = require('../../models/sql/Follower');
const jwt = require('jsonwebtoken');
import CacheService from '../../config/cache';

process.env.SECRET_KEY = 'secret';
const ttl = 60 * 60 * 1; // cache for 1 Hour
const cache = new CacheService(ttl); // Create a new cache service instance

module.exports.getNewsFeedDummy = function(req, callback){
    let key = `getNewsFeedDummy`;
    return cache.get(key,() => {
        TweetModel.find({},{"_id":1}).limit(10)
        .then(result => {
            callback(null,{
                success: true,
                msg: "Successfully fetched the tweet" ,
                payload: result
            })
        })
        .catch(err => {
            callback(null, {
                success: false,
                msg: "Something went wrong",
                payload: err
            })
        });
    })
}

var getToken = (token) => {
    return token.substr(7);
}

module.exports.getNewsFeed = function(req,callback) {
    // var token = getToken(req.headers.authorization);
    // var payload = jwt.verify(token, process.env.SECRET_KEY);
    var userId = "1";// payload.id;
    getFollowingList(userId)
    .then( (followingList) => {
        TweetModel.find({ "userId" : { $in : followingList}},{"_id":1},function (err, result) {
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
        console.log("err in getNewsFeed ",err.message)
    });
}

var getFollowingList = (userId) => {
    return new Promise(function(resolve,reject){
        followerModel.findAll({ 
            where : { FollowerId : userId},
            attributes : ['UserID']
        }).then( (results) => {
            console.log("results are ",results);
            var followingList = results.map( tweet => {
                return tweet.dataValues.UserId;
            })
            console.log("following list is ",followingList);
            resolve(followingList);
        }).catch( (err) => {
            console.log("err in getFollowingList ",err.message)
            reject(err);
        })

    })
}