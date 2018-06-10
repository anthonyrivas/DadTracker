const express = require('express'),
    controller = require('../controllers/html'),
    db = require('../models'),
    router = express.Router();

router.get('/', controller.renderHome)
router.get('/checkpoints', controller.renderCheckpoints)
router.get('/Log', controller.renderLog)

module.exports = router;