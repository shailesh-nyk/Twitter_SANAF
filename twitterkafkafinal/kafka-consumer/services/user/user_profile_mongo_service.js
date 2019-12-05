'use-strict'

const UserModel = require('../../models/users');
var upload = require('../../middleware/FileUploadMiddleware')

const moment = require('moment-timezone');

module.exports.getUserProfile = function(req, callback){
    console.log("new filename 2"+req.filename);
    let result;
    //console.log("Aish")
   // console.log(req);
    UserModel.findOne({
        
                _id:req._id
        
    })
    .then(user => {
      
                    if (user) {
                        
                        const userDetails ={
                            name:user.name,
                            d_o_b:user.d_o_b,
                            city:user.city,
                            state:user.state,
                            _id:user._id,
                            handle:user.handle,
                            avatar:user.avatar,
                            description:user.description,
                            phone_no:user.phone_no,
                            email:user.email,
                            followedBy : user.followedBy,
                            following : user.following
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

module.exports.updateImage = function(req, callback) {
    UserModel.count({
        
        _id: req._id
        
    })
    .then(c=>{ console.log("image updation count ",c)
               
              if(c>0)
               {
                   
                        UserModel.updateOne({
                            
                                    _id:req._id
                            
                        },{
                            
                            avatar:req.avatar,
                            
                        })
                            .then(user => {
                                            console.log("jksjkjdkjdkejdkejdke");                        
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

}
module.exports.editUserProfile = function(req, callback){

    let result;
    console.log("Aiuhswraya body")
    //console.log(req.avatar)
    console.log(req._id)
  
    UserModel.count({
        
        _id: req._id
        
    })
    .then(c=>{ console.log("C nsnsn sjsj ",c)
               
              if(c>0)
               {
                   
                        UserModel.updateOne({
                            
                                    _id:req._id
                            
                        },{
                            name:req.name,
                            //avatar:req.avatar,
                            description:req.description,
                            city:req.city,
                            d_o_b:req.d_o_b
                        })
                            .then(user => {
                                            console.log("jksjkjdkjdkejdkejdke");                        
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

module.exports.incrementViewCount = function(req, callback) {
    console.log("Request ...",req)
    console.log('------------------------------------------------------------------------------------')

    var moment = require('moment');

//var utcDate = moment.utc().toDate();

var utc = new Date();
utc.setHours( utc.getHours() - 8);

//console.log("UTC Date....", utc);
   
    UserModel.findByIdAndUpdate(
        req.user_id,
        { $push: { "views": {user:req.viewed_by,createdOn:utc} } },
        { safe: true, upsert: true, new: true },
        function (err, model) {

         //   console.log("Hello",model);
        
            callback(null,model);
        }
    );
   
   
}