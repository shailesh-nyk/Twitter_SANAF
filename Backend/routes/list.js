var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

//CREATE A NEW LIST
router.post('/', function(req, res) {
    console.log('INSIDE POST ' + req.url);
    let request = {
      body: req.body,
      message: 'CREATE_LIST'
    }
    kafka.make_request('list', request , res);
})


module.exports = router;