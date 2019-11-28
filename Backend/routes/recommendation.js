var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.get('/recommend', function(req, res) {
    let request = {
      body: req.query,
      message: 'GET_RECOMMENDATION'
    }
    kafka.make_request('recommendation', request , res);
})

module.exports = router;