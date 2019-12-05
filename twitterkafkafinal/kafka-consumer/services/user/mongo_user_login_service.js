'use strict'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserModel = require('../../models/users');

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
          //cond = { email:req.username_or_email_or_phone };
		  cond = { email:"test@gmail.com" };
          condType = "Email";
        }
    else
        {
          cond = { handle:req.username_or_email_or_phone };
          condType = "Username";
        }        
		
		//cond = { email:"test@gmail.com" };
        //condType = "Email";

        cond.accountStatus = "active" ;
    
    UserModel.findOne(
        cond
    )
    .then(user => {
      
                    if (user) {
                        
                        if (bcrypt.compareSync(req.password, user.password)) {
                            
                                let jwtPayload = {id:user._id,name:user.name,city:user.city,state:user.state,zip:user.zip,phone_no:user.phone_no,avatar:user.avatar,description:user.description,handle:user.handle,d_o_b:user.d_o_b}
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
                        
                        result = { success:false, msg:"We could not verify your credentials or your account has been deactivated. Please double-check and try again."};
                        callback(null,result);
                    }


            })
            .catch(err => {
                result = { success:false,msg:err.message };
                callback(null,result);
              });
                        
};