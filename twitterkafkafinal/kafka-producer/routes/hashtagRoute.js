var express = require('express');
var router = express.Router();
var hashtagRouteController = require('../controller/HashtagController') ;

router.get('/',hashtagRouteController.getTweetHashTags);

module.exports = router;