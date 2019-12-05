'use strict'
const bcrypt = require('bcryptjs');

var UserModel = require('../../models/users');


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

    UserModel.findOne(
        cond
    )
    .then(user => {
      if (!user) {
      bcrypt.hash(req.password, 10, (err, hash) => {
         
        req.password = hash

        const user = new UserModel({
            name: req.name,
            d_o_b: req.d_o_b,
            password: req.password,
            email: req.email,
            phone_no : req.phone_no,
            handle : req.name+req.d_o_b
        });

             user.save()
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