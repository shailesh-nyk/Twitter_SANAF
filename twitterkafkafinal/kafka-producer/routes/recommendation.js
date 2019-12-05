var express = require('express');
var router = express.Router();
var recommendationController = require('../controller/RecommendationController') ;

router.get('/',recommendationController.getRecommendations);

router.get('/search',recommendationController.search);

module.exports = router;