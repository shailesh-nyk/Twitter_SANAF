
module.exports.getSomething = function(req, callback){
    console.log("Inside service");
    callback(null,{
        success: true,
        msg: "Successfully fetched the user profile" ,
        payload: "SOMETHING" 
    }) 
};
