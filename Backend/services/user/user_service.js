
module.exports.getSomething = function(req, callback){
    console.log("Inside service");//Testing
    callback(null,{
        success: true,
        msg: "Successfully fetched the user profile" ,
        payload: "SOMETHING" 
    }) 
};
