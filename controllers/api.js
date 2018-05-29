const db = require('../models');
module.exports = {
    getMessages: (req, res) => {
        db.Message.findAll({
            where: {
                UserId: 1
            }
        }).then((ret) => {
            console.log(ret);
            res.json(
                ret
            )
        })
    },
    postMessage: (req, res) => {
        let message = req.body.newMessage;
        db.Message.create({
            message: message,
            UserId: 1
        }).then(ret => {

            console.log(message);
            res.redirect('/messages');
        });
    },
    getCheckpoints: (req, res) => {
        db.Checkpoint.findAll({
            where: {
                UserId: 1
            }
        }).then((ret) => {
            console.log(ret);
            res.json(
                ret
            )
        })
    },
    postCheckpoint: (req, res) => {
        let hasImage = true;
        if (req.body.imageLink == "") {
            hasImage = false;
        }
        db.Checkpoint.create({
            cpType: req.body.checkpointType,
            value: req.body.checkpointValue,
            image: hasImage,
            imageUrl: req.body.imageLink,
            UserId: 1
        }).then(ret => {
            res.redirect('/checkpoints');
        });
    }
}