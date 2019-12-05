var express = require('express');
var router = express.Router();
var passport = require("passport");

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.writeHead(200, {'Content-Type': 'application/json'});
  res.status(200).json("Welcome to Twitter....");
});


module.exports = router;
