//connect to MongoDB
var mongoose = require('mongoose');

module.exports.connectDB = function(){
    var mongoDBServer = "mongodb+srv://snayak:nayak1234@cluster0-bljxl.mongodb.net/twitter?retryWrites=true&w=majority&poolSize=5";
    mongoose.connect(mongoDBServer, { useNewUrlParser: true , useUnifiedTopology: true })
    .then(data => console.log("DB connection successful!!!"))
    .catch(error => console.log(error));
    
    mongoose.connection.on('error', err => {
        console.log("========== MONGO DB ERROR ========");
        console.log(err)
    });

}
