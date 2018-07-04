const db = require('../models');
module.exports = controller = {
    find: (req, res, cb) => {
        db.Checkpoint.findAll({
            where: {
                UserId: req.user.id
            }
        }).then((ret) => {
            cb(ret);
        })
    },
    postCheckpoint: (req, res) => {
        let hasImage = true;
        if (req.file == undefined) {
            req.file = {};
            req.file.filename = null;
        }
        if (req.file.filename == null) {
            hasImage = false;
        } else {
            req.file.filename = req.file.filename;
        }
        db.Checkpoint.create({
            cpType: req.body.checkpointType,
            value: req.body.checkpointValue,
            image: hasImage,
            imageUrl: req.file.filename,
            UserId: req.user.id
        }).then(ret => {
            res.redirect('/checkpoints');
        });
    },
    putCheckpoint: (req, res) => {
        db.Checkpoint.update({
            cpType: req.body.checkpointType,
            value: req.body.checkpointValue,
        },
            {
                where: {
                    id: req.body.id
                }
            }).then(ret => {
                res.redirect('/checkpoints');
            });
    },
    deleteCheckpoint: (req, res) => {
        db.Checkpoint.destroy({
            where: {
                id: req.body.id
            }
        }).then(ret => {
            res.redirect('/checkpoints');
        });
    }
}