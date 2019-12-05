//For File Uploading Purpose, will create folder if not exists and check which kind of file extension types are allowed
let multer  = require('multer');
profileImgDestination = './public/profileImages/'; 

//For Profile Image
let storageForProfileImage = multer.diskStorage({
    destination: (req, file, callBack) => {
      //callBack(null, './uploads/profileImages/');
      callBack(null, profileImgDestination);
    },
    filename: (req, file, callBack) => {
      //console.log(file);
      let filetype = '';
      
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }

      req.profileImageName = 'pi-'+ req.payLoad.type_of_user+'-' + Date.now() + '.' + filetype; 
      callBack(null, req.profileImageName);
      //callBack(null, 'image-'+'user-'+ Date.now() + '.' + filetype);
    }
});

const fileFilter = (req,file,cb) =>{

  if(file.mimetype==='image/png'|| file.mimetype === 'image/jpeg'){
     cb(null,true);
  }else{
    cb(new Error('File Type Not allowed...'),false);
  }
};



exports.uploadProfileImage = multer({storage: storageForProfileImage,limits:{
  fileSize : 1024 * 1024 * 5
},
fileFilter: fileFilter
});


module.exports.profileImgDestination = profileImgDestination;
