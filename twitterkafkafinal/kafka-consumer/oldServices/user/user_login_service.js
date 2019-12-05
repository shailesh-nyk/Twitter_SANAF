'use strict'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userModel = require('../../models/sql/User');

process.env.SECRET_KEY = 'secret';
const jwtExpiryInSeconds = 600000

module.exports.userLogin = function(req, callback){

    let result;

    let cond,condType="";
     
    if(!isNaN(req.username_or_email_or_phone))
        {
          cond = { phone_no:req.username_or_email_or_phone };
          condType = "Phone Number";
        } 
   else if(req.username_or_email_or_phone.includes("@"))
        {
          cond = { email:req.username_or_email_or_phone };
          condType = "Email";
        }
    else
        {
          cond = { username:req.username_or_email_or_phone };
          condType = "Username";
        }          

    userModel.findOne({
        where: cond
    })
    .then(user => { console.log("User...",user);
      
                    if (user) {
                        
                        if (bcrypt.compareSync(req.password, user.password)) {
                            
                                let jwtPayload = {id:user.dataValues.id,name:user.dataValues.name}
                                let token = jwt.sign(jwtPayload, process.env.SECRET_KEY, {
                                expiresIn: jwtExpiryInSeconds
                            })

                        //res.cookie('token', token, { maxAge: jwtExpiryInSeconds * 100000});
                        result = { success:true, msg:"Successfully Logged In...",token:token};
                        callback(null,result);
                        
                    }
                        else{
                            result = { success:false, msg:`Incorrect ${condType} or password...`};
                            callback(null,result);
                        }
                    } else {
                        
                        result = { success:false, msg:"We could not verify your credentials. Please double-check and try again."};
                        callback(null,result);
                    }


            })
            .catch(err => {
                result = { success:false,msg:err.message };
                callback(null,result);
              });
                        
};