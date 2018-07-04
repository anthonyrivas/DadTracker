require('dotenv').config()
const express = require('express'),
    controller = require('../controllers/api'),
    crypto = require('crypto'),
    fs = require('fs'),
    cloud_name = process.env.CLOUDINARY_NAME,
    api_key = process.env.CLOUDINARY_KEY,
    api_secret = process.env.CLOUDINARY_SECRET,
    cloudinary = require('cloudinary'),
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
    uploadcdny = (req, res, next) => {
        if (req.file) {
            cloudinary.uploader.upload('public/uploads/' + req.file.filename, function (result) {
                fs.unlink('public/uploads/' + req.file.filename, (err) => {
                    if (err) throw err;
                    console.log('path/file.txt was deleted');
                });
                req.file.filename = result.url;
                return next();
            })
        } else {
            return next();
        }
    };
cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret
});
router = express.Router();
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.json({ error: "401:Not authenticated" });

}
router.get('/', isLoggedIn, (req, res) => {
    res.send('Welcome to the api!');
})
// router.post('/checkpoint', isLoggedIn, upload.single('imgUpload'), controller.postCheckpoint);
router.post('/checkpoint', isLoggedIn, upload.single('imgUpload'), uploadcdny, controller.postCheckpoint);
router.put('/checkpoint', isLoggedIn, controller.putCheckpoint);
router.delete('/checkpoint', isLoggedIn, controller.deleteCheckpoint);

module.exports = router;