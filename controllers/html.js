// const request = require('request');
// const innerRequest = (req, route, cb) => {
//     request.get(req.protocol + '://' + req.get('host') + route, (err, response, body) => {
//         let data = JSON.parse(body)
//         cb(data)
//     })
// }
const api = require('./api');

module.exports = {
    renderHome: (req, res) => {
        let data = {
            user: true,
            scriptName: 'home',
            page: {
                home: true
            },
            images: []
        }

        api.find(req, res, (ret) => {
            ret.forEach(element => {
                if (element.image) {
                    data.images.push(element);
                }
            });
            res.render('home', data);
        })
    },
    renderCheckpoints: (req, res) => {
        let data = {
            user: true,
            scriptName: 'checkpoint',
            page: {
                checkpoints: true
            }
        };
        res.render('checkpoints', data);
    },
    renderLog: (req, res) => {
        let data = {
            user: true,
            scriptName: "log",
            page: {
                log: true
            }
        };
        api.find(req, res, (ret) => {
            data.checkpoints = ret;
            res.render('log', data);
        });
    }
}