var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');
var jwt_decode = require('jwt-decode');

//CREATE A NEW LIST
router.post('/', function(req, res) {
    console.log('INSIDE POST ' + req.url);
    let request = {
      body: req.body,
      message: 'CREATE_LIST'
    }
    kafka.make_request('list', request , res);
})

//GET USER LIST
router.get('/', function(req, res) {
    console.log('INSIDE GET ' + req.url);
    let request = {
      body: { user_id : jwt_decode(req.headers.authorization).id },
      message: 'GET_USER_LIST'
    }
    kafka.make_request('list', request , res);
})

//GET LIST DETAILS
router.get('/details', function(req, res) {
  console.log('INSIDE GET ' + req.url);
  let request = {
    body: req.query,
    message: 'LIST_DETAILS'
  }
  kafka.make_request('list', request , res);
})

//REMOVE USER FROM  A LIST
router.delete('/', function(req, res) {
  console.log('INSIDE DELETE ' + req.url);
  let request = {
    body: req.body,
    message: 'REMOVE_USER'
  }
  kafka.make_request('list', request , res);
})


//EDIT A LIST
router.put('/', function(req, res) {
  console.log('INSIDE PUT ' + req.url);
  let request = {
    body: req.body,
    message: 'EDIT_LIST'
  }
  kafka.make_request('list', request , res);
})

module.exports = router;