const express = require('express'),
    controller = require('../controllers/html'),
    db = require('../models'),
    router = express.Router();

router.get('/', controller.renderHome)
router.get('/messages', controller.renderMessages)
router.get('/checkpoints', controller.renderCheckpoints)

module.exports = router;