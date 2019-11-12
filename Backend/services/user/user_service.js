
module.exports.getSomething = function(req, callback){
    console.log("Inside service");//Testing 4
    callback(null,{
        success: true,
        msg: "Successfully fetched the user profile" ,
        payload: "SOMETHING" 
    }) 
};
