'use-strict'

const UserModel = require('../../models/users');
var upload = require('../../middleware/FileUploadMiddleware')
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


module.exports.editUserProfile = function(req, callback){

    let result;
    console.log("Aiuhswraya body")
    console.log(req.avatar)
    console.log(req.body._id)
  
    UserModel.count({
        
        _id: req.body._id
        
    })
    .then(c=>{ console.log("C nsnsn sjsj ",c)
               
              if(c>0)
               {
                   
                        UserModel.updateOne({
                            
                                    _id:req.body._id
                            
                        },{
                            name:req.body.name,
                            avatar:req.avatar,
                            description:req.body.description,
                            city:req.body.city,
                            d_o_b:req.body.d_o_b
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
    console.log(req)
    console.log('------------------------------------------------------------------------------------')
   
    UserModel.findByIdAndUpdate(
        req.user_id,
        { $push: { "views": req.viewed_by } },
        { safe: true, upsert: true, new: true },
        function (err, model) {

         //   console.log("Hello",model);
        
            callback(null,model);
        }
    );
   
   
}