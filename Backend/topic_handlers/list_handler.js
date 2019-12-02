var createListService = require('../services/list/create_list_service');
var getUserListService = require('../services/list/get_user_list_service');
var getListDetailsService = require('../services/list/list_details_service');
var  removeUserService = require('../services/list/remove_user_service');
var editListService = require('../services/list/edit_list_details_service');
var subscribeListService = require('../services/list/subscribe_service');
var addMemberService = require('../services/list/add_list_member_service');

const messageServiceMap = {
    'CREATE_LIST': createListService.createList,
    'GET_USER_LIST': getUserListService.getUserList,
    'LIST_DETAILS': getListDetailsService.getListDetails,
    'REMOVE_USER': removeUserService.removeUser,
    'EDIT_LIST': editListService.editListDetails,
    'SUBSCRIBE_LIST': subscribeListService.subscribeToList,
    'UNSUBSCRIBE_LIST': subscribeListService.unsubscribeToList,
    'ADD_MEMBER': addMemberService.addMember
}

module.exports.handleRequest = function (req, callback) {
    let func = messageServiceMap[req.message];
    console.log("====== RECEIVED REQUEST FOR  " + req.message + "=======");
    console.log(req.body);
    console.log("==================================")
    func(req.body, callback);
};

