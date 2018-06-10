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

router.get('/', (req, res) => {
    res.send('Test the api router');
})
router.get('/checkpoints', controller.getCheckpoints);
router.post('/checkpoint', upload.single('imgUpload'), controller.postCheckpoint);
router.put('/checkpoint', controller.putCheckpoint);
router.delete('/checkpoint', controller.deleteCheckpoint);

module.exports = router;