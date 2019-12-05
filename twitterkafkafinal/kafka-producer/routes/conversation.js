var express = require('express');
var router = express.Router();
var convController = require('../controller/ConversationController') ;

router.get('/heads',convController.getHeads);

router.post('/save',convController.save);

router.post('/create',convController.create);


module.exports = router;