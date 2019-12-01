var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client');

router.get('/', function(req, res) {
    let request = {
      body: req.query,
      message: 'GET_RECOMMENDATION'
    }
    kafka.make_request('recommendation', request , res);
})

router.get('/search', function(req, res) {
  let request = {
    body: req.query,
    message: 'GET_SEARCH_RESULTS'
  }
  kafka.make_request('recommendation', request , res);
})

module.exports = router;