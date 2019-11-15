var userRegnService = require('../services/user/user_registration_service');

const messageServiceMap = {
    'USER_REGISTRATION' : userRegnService.userRegistration,
    'USER_LOGIN' : userRegnService.userLogin,
    'USER_PROFILE_GET' : userRegnService.getUserProfile,
    'USER_PROFILE_UPDATION' : userRegnService.editUserProfile,
}

module.exports.handleRequest = function(req, callback){
     let func = messageServiceMap[req.message];
     console.log("====== RECEIVED REQUEST FOR  " + req.message + "=======");
     console.log(req.body);
     console.log("==================================")
     func(req.body, callback);
};

