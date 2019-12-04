var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var kafka = require('../kafka/client');
var jwt_decode = require('jwt-decode');
var upload = require('../middleware/FileUploadMiddleware');
var passport = require('passport');
require('./../config/passport')(passport);
var requireAuth = passport.authenticate('jwt', {session: false});

router.post('/register', function(req, res) {
    let request = {
      body: req.body,
      message: 'USER_REGISTRATION'
    }
    kafka.make_request('user', request , res);
});

router.post('/login', function(req, res) {
  
  let request = {
    body: req.body,
    message: 'USER_LOGIN'
  }
  kafka.make_request('user', request , res);
});

router.get('/userProfile',requireAuth, function(req, res) {
  
  let request = {
    body: req.query,
    message: 'USER_PROFILE_GET'
  }
  kafka.make_request('user', request , res);
});
router.post('/userImageUpdate',requireAuth,function(req,res) {
  console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
  console.log(req.body)
  let request = {
    body: req.body,
   
    message: 'USER_IMAGE_UPDATION'
  }
  kafka.make_request('user', request , res);
})
router.post('/userProfile',requireAuth,function(req, res) {
  
  let request = {
    body: req.body,
   
    message: 'USER_PROFILE_UPDATION'
  }
  kafka.make_request('user', request , res);
});


//GET NEWS FEED 
router.get('/newsfeed',requireAuth, function(req, res) {
  let user_id = jwt_decode(req.headers.authorization).id;
  let request = {
    body: { user_id : user_id },
    message: 'GET_NEWS_FEED'
  }
  kafka.make_request('user', request , res);
})

router.post('/follow',requireAuth, function(req, res) {
  let request = {
    body: req.body,
    message: 'FOLLOW'
  }
  kafka.make_request('user', request , res);
})

router.post('/unfollow',requireAuth, function(req, res) {
  
  let request = {
    body: req.body,
    message: 'UNFOLLOW'
  }
  kafka.make_request('user', request , res);
})

router.get('/following',requireAuth, function(req, res) {
  //console.log("Redvbvd mdmdd",req.user);
  let request = {
    body: req.user,
    message: 'FOLLOWING'
  }
  kafka.make_request('user', request , res);
})

router.get('/followers', function(req, res) {
  console.log(req.query)
  let request = {
    body: req.query,
    message: 'FOLLOWERS'
  }
  kafka.make_request('user', request , res);
})

router.get('/followedBy',requireAuth , function(req, res) {
 
  let request = {
    body: req.user,
    message: 'FOLLOWED_BY'
  }
  kafka.make_request('user', request , res);
})


//GET BOOKMARKS 
router.get('/bookmark',requireAuth, function(req, res) {
  let user_id = jwt_decode(req.headers.authorization).id;
  let request = {
    body: { user_id : user_id },
    message: 'GET_BOOKMARKS'
  }
  kafka.make_request('user', request , res);
})

router.put('/deactivateAccount',requireAuth, function(req, res) {
  let request = {
    body: req.user,
    message: 'USER_ACCOUNT_DEACTIVATE'
  }
  kafka.make_request('user', request , res);
});

router.post('/incrementViewCount',requireAuth, function(req,res) {
  console.log('ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo')
  let request = {
    body: req.body,
    message: 'USER_VIEW_INCREMENT'
  }
  kafka.make_request('user', request , res);
});


router.get('/followersnew',requireAuth, function(req, res) {
  let request = {
    body: req.query,
    message: 'FOLLOWERS_NEW'
  }
  kafka.make_request('user', request , res);
})

router.get('/followingnew',requireAuth , function(req, res) {
  let request = {
    body: req.query,
    message: 'FOLLOWING_NEW'
  }
  kafka.make_request('user', request , res);

})
module.exports = router;

