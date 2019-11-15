'use strict'
const bcrypt = require('bcryptjs');

const userModel = require('../../models/sql/User');


module.exports.userRegistration = function(req, callback){

    let result;

    userModel.findOne({
        where: {
        email: req.email
        }
    })
    .then(user => {
      if (!user) {
      bcrypt.hash(req.password, 10, (err, hash) => {
         
        req.password = hash
                userModel.create(req)
                    .then(data => {
                                    result = { success:true, msg:"Congrats, you are successfully registered !!, Sign in to continue..." };
                                    callback(null,result);
                                })
                    .catch(err => {
                        result = { success:false,msg:err };
                        callback(null,result);
                        
                    })
                })
           } else {
                    result ={ success:false, msg:"Email Id already exists..." };
                    callback(null,result);
                }
            })
            .catch(err => {
                result = { success:false,msg:err };
                callback(null,result);
              });
                        
};