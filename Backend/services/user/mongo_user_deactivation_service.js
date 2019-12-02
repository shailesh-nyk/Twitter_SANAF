'use strict'

const UserModel = require('../../models/users');

module.exports.deactivateAccount = function(req, callback){

    let result;
          
    UserModel.findOneAndUpdate(
        {_id:req.id},{accountStatus:"deactive"},{new:true}
       )
    .then(user => {
      
               result = { success:true, msg:"User Account Has been Deactivated..."};
               callback(null,result);

            })
            .catch(err => {
                result = { success:false,msg:err.message };
                callback(null,result);
              });
                        
};