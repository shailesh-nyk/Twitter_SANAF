'use strict'

const userModel = require('../../models/sql/User');

module.exports.getUserProfile = function(req, callback){

    let result;
    
    userModel.findOne({
        where: {
                id:5
        }
    })
    .then(user => {
      
                    if (user) {
                        
                        const userDetails ={
                            name:user.dataValues.name,
                            d_o_b:user.dataValues.d_o_b,
                            city:user.dataValues.email,
                            state:user.dataValues.phone_num,
                            zip:user.dataValues.profile_img_file_name,
                            profile_image : user.dataValues.profile_image,
                            description: user.dataValues.description,
                            username: user.dataValues.username,
                            email : user.dataValues.email,
                            phone_no : user.phone_no,
                            created_on : user.dataValues.created_on,
                            followedBy : user.dataValues.followedBy,
                            following : user.dataValues.following
                           };
                        
                        result = { success:true, msg:"User Profile Details...",userDetails:userDetails};
                        callback(null,result);
                        
                    } else {
                        
                        result = { success:false, msg:"User Not Found..."};
                        callback(null,result);
                    }


            })
            .catch(err => {
                result = { success:false,msg:err.message };
                callback(null,result);
              });
                        
};

module.exports.editUserProfile = function(req, callback){

    let result;
    
    userModel.count({
        where: {
        id: 58
        }
    })
    .then(c=>{ console.log("C nsnsn sjsj ",c)
               
              if(c)
               {
                   
                        userModel.update(req,{
                            where: {
                                    id:58
                            }
                        })
                            .then(user => {
                                                                    
                                            result = { success:true, msg:"User Details Successfully Updated..."};
                                            callback(null,result);

                                    })
                                    .catch(err => {
                                        result = { success:false,msg:err.message };
                                        callback(null,result);
                                    });

                }else{
                    result = { success:false, msg:"User Not Found..."};
                    callback(null,result);

                }           

            })
            .catch(err => {
                result = { success:false,msg:err.message };
                callback(null,result);
            });

        
                        
};