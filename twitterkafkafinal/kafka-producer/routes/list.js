var express = require('express');
var router = express.Router();
var listController = require('../controller/ListController') ;

router.post('/',listController.createList);

router.get('/',listController.getLists);

router.get('/details',listController.details);

router.delete('/member',listController.deleteMember);

router.put('/',listController.editList);

router.post('/subscribe',listController.subscribe);

router.post('/unsubscribe',listController.unsubscribe);

router.put('/member',listController.member);

module.exports = router;