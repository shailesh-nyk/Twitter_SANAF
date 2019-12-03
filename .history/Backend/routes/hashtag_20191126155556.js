var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

//ADD A HASHTAG
router.post('/', function(req, res) {
    console.log('INSIDE POST ' + req.url);
    let request = {
      body: req.body,
      message: 'ADDHASHTAG'
    }
    kafka.make_request('hashtag', request , res);
})