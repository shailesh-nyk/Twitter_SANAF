var userRegnService = require('../services/user/mongo_user_registration_service');
var userLoginService = require('../services/user/mongo_user_login_service');
var userProfileService = require('../services/user/user_profile_service');
var userService = require('../services/user/user_service');

const messageServiceMap = {
    'USER_REGISTRATION' : userRegnService.userRegistration,
    'USER_LOGIN' : userLoginService.userLogin,
    'USER_PROFILE_GET' : userProfileService.getUserProfile,
    'USER_PROFILE_UPDATION' : userProfileService.editUserProfile,
    'GET_NEWS_FEED' : userService.getNewsFeedDummy
}

module.exports.handleRequest = function(req, callback){
     let func = messageServiceMap[req.message];
     console.log("====== RECEIVED REQUEST FOR  " + req.message + "=======");
     console.log(req.body);
     console.log("==================================")
     func(req.body, callback);
};

