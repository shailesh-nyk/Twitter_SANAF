var ListModel = require('../../models/lists');
var UserModel = require('../../models/users');
var TweetModel = require('../../models/tweet');
var utils = require('../../middleware/utils');

module.exports.getListDetails = function(req, callback){
     ListModel.findById(req.list_id)
    .lean()
    .populate([{path : "createdBy", select:'name handle avatar' }, {path : "list", select:'name handle avatar' }])
    .exec()
    .then( resp => {
        let userList = resp.list.map(list => list._id);
        var d = new Date();
        d.setDate(d.getDate() - 30);
        let search = {
            "userId" : { $in : userList},
            "postedOn" : { $gt : d }
        }
        TweetModel.find( search ,function (err, result) {
            if (err) {
                callback(null, {
                        success: false,
                        msg: "Something went wrong",
                        payload: err
                })
            }
            else if(result) {
                result.map(tweet => {
                    tweet.set('timeElapsed', utils.getTimeElapsed(tweet.postedOn) , {strict: false});
                    tweet.comments.map(comment => {
                        comment.set('timeElapsed', utils.getTimeElapsed(comment.postedOn) , {strict: false});
                    })
                })
                resp['tweets'] = result;
                callback(null,{
                    success: true,
                    msg: "Successfully fetched the list details" ,
                    payload: resp
                }) 
            } 
        }).populate( [{ path:'userId', select:'name handle avatar'}, { path:'comments.user', select:'name handle avatar'}])
        .sort({ postedOn : 'descending'})
    })
    .catch(err => {
        console.log("err in getNewsFeed ",err.message)
    });
};



