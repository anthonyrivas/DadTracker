const express = require('express'),
    controller = require('../controllers/api'),
    crypto = require('crypto'),
    mime = require('mime'),
    multer = require('multer'),
    upload = multer({
        storage: multer.diskStorage({
            destination: 'public/uploads',
            filename: function (req, file, cb) {
                crypto.pseudoRandomBytes(16, function (err, raw) {
                    cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
                });
            }
        })
    }),
    router = express.Router();
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.json({ error: "401:Not authenticated" });

}
router.get('/', (req, res) => {
    res.send('Test the api router');
})
router.post('/checkpoint', isLoggedIn, upload.single('imgUpload'), controller.postCheckpoint);
router.put('/checkpoint', isLoggedIn, controller.putCheckpoint);
router.delete('/checkpoint', isLoggedIn, controller.deleteCheckpoint);

module.exports = router;