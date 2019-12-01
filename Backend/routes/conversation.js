var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var kafka = require('../kafka/client');

router.get('/heads', function(req, res) {
    let request = {
      body: req.query,
      message: 'GET_CONVERSATION_HEADS'
    }
    kafka.make_request('conversation', request , res);
})

router.post('/save', function(req, res) {
  let request = {
    body: req.body,
    message: 'SEND_MESSAGE'
  }
  kafka.make_request('conversation', request , res);
})

router.post('/create', function(req, res) {
  let request = {
    body: req.body,
    message: 'CREATE_HEAD'
  }
  kafka.make_request('conversation', request , res);
})


module.exports = router;