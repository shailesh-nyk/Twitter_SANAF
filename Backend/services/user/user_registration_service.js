'use strict'
const bcrypt = require('bcryptjs');

const userModel = require('../../models/sql/User');


module.exports.userRegistration = function(req, callback){

    let result;

    let cond,condType="";
     
    if(req.hasOwnProperty("email") && req.email!="")
        { 
          cond = { email:req.email };
          condType = "Email Id";
        }  
    
    if(req.hasOwnProperty("phone_no") && req.phone_no!="")
        {
          cond = { phone_no:req.phone_no };
          condType = "Phone No";
        }      

    userModel.findOne({
        where: cond
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
                        result = { success:false,msg:err.message };
                        callback(null,result);
                        
                    })
                })
           } else {
                    result ={ success:false, msg:`${condType} already exists...` };
                    callback(null,result);
                }
            })
            .catch(err => {
                result = { success:false,msg:err.message };
                callback(null,result);
              });
                        
};