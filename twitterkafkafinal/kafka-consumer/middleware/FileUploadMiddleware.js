var multer = require('multer')
var path= require('path')
var storage = multer.diskStorage({
	destination: function(req, file, callback) {
        console.log('here');
		callback(null, './public/images/profile')
	},
	filename: function(req, file, callback) {
        console.log(file)
        req.filename='public/images/profile/'+file.fieldname + '-' + req.body._id + file.originalname;
        console.log("new file name"+req.filename);
		callback(null, file.fieldname + '-' + req.body._id + file.originalname);
	}
})
const fileFilter = (req, file, cb) =>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        cb(null,true);
    }
    else{
        cb(null,false)
    }
}
var upload=multer({
    storage:storage
})
module.exports=upload;