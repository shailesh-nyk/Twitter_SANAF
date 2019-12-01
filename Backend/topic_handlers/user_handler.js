var userRegnService = require('../services/user/mongo_user_registration_service');
var userLoginService = require('../services/user/mongo_user_login_service');
var userProfileService = require('../services/user/user_profile_mongo_service');
var userService = require('../services/user/user_service');
var userFollow = require('../services/user/mongo_user_follow')
var userUnfollow = require('../services/user/mongo_user_unfollow')
var userFollowing = require('../services/user/mongo_user_fetch_following')
var bookmarkService = require('../services/user/bookmarks_service');
const messageServiceMap = {
    'USER_REGISTRATION' : userRegnService.userRegistration,
    'USER_LOGIN' : userLoginService.userLogin,
    'USER_PROFILE_GET' : userProfileService.getUserProfile,
    'USER_PROFILE_UPDATION' : userProfileService.editUserProfile,
    'GET_NEWS_FEED' : userService.getNewsFeed,
    'FOLLOW' : userFollow.follow,
    'UNFOLLOW': userUnfollow.unfollow,
    'FOLLOWING' : userFollowing.getFollowing,
    'GET_BOOKMARKS': bookmarkService.getBookmarks
}

module.exports.handleRequest = function(req, callback){
     let func = messageServiceMap[req.message];
     console.log("====== RECEIVED REQUEST FOR  " + req.message + "=======");
     console.log(req.body);
     console.log("==================================")
     func(req.body, callback);
};

