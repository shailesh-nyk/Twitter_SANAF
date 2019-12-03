var userRegnService = require('../services/user/user_registration_service');
var userLoginService = require('../services/user/user_login_service');
var userProfileGetService = require('../services/user/user_registration_service');
var userProfileEditService = require('../services/user/user_registration_service');

const messageServiceMap = {
    'USER_REGISTRATION' : userRegnService.userRegistration,
    'USER_LOGIN' : userLoginService.userLogin,
    'USER_PROFILE_GET' : userProfileGetService.getUserProfile,
    'USER_PROFILE_UPDATION' : userProfileEditService.editUserProfile,
}

module.exports.handleRequest = function(req, callback){
     let func = messageServiceMap[req.message];
     console.log("====== RECEIVED REQUEST FOR  " + req.message + "=======");
     console.log(req.body);
     console.log("==================================")
     func(req.body, callback);
};

