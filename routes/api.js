const express = require('express'),
    controller = require('../controllers/api'),
    router = express.Router();

router.get('/', (req, res) => {
    res.send('Test the api router');
})
router.get('/messages', controller.getMessages);
router.post('/message', controller.postMessage);
router.get('/checkpoints', controller.getCheckpoints);
router.post('/checkpoint', controller.postCheckpoint);

module.exports = router;