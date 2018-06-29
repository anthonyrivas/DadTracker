const express = require('express'),
    controller = require('../controllers/html'),
    db = require('../models'),
    router = express.Router();
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/user/login');

}
router.get('/', isLoggedIn, controller.renderHome)
router.get('/checkpoints', isLoggedIn, controller.renderCheckpoints)
router.get('/Log', isLoggedIn, controller.renderLog)

module.exports = router;