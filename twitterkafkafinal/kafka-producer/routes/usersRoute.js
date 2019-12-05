var express = require('express');
var router = express.Router();
var userController = require('../controller/UserController') ;
let middleware = require('../middleware/verifyToken');
const passport = require("passport");
var requireAuth = passport.authenticate('jwt', {session: false});

/* GET users listing. */
/* router.get('/', function(req, res, next) {
  res.send('respond with a resource');
}); */

//Register
router.post('/register', userController.register);

//Login
router.post('/login', userController.login);

//User Profile
router.get('/userProfile',requireAuth,userController.getUserProfile);
//router.get('/userProfile',userController.getUserProfile);
router.post('/userImageUpdate',requireAuth,userController.userImageUpdate);

router.post('/userProfile',requireAuth,userController.editUserProfile);

router.get('/newsfeed',requireAuth,userController.newsfeed);
router.post('/follow',requireAuth,userController.follow);

router.post('/unfollow',requireAuth,userController.unfollow);
router.get('/following',requireAuth,userController.following);

router.get('/followers',userController.followers);
router.get('/followedBy',requireAuth,userController.followedBy);
router.get('/bookmark',requireAuth,userController.bookmark);

router.put('/deactivateAccount',requireAuth,userController.deactivateAccount);
router.post('/incrementViewCount',requireAuth,userController.incrementViewCount);
router.get('/followersnew',requireAuth,userController.followersnew);

router.get('/followingnew',requireAuth,userController.followingnew);


module.exports = router;
