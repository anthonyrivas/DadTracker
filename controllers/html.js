const request = require('request');
const innerRequest = (req, route, cb) => {
    request.get(req.protocol + '://' + req.get('host') + route, (err, response, body) => {
        let data = JSON.parse(body)
        cb(data)
    })
}
module.exports = {
    renderHome: (req, res) => {
        let data = {
            scriptName: 'home',
            page: {
                home: true
            },
            images: []
        }
        innerRequest(req, '/api/checkpoints', (ret) => {
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
            scriptName: 'checkpoint',
            page: {
                checkpoints: true
            }
        };
        innerRequest(req, '/api/checkpoints', (ret) => {
            data.checkpoints = ret;
            res.render('checkpoints', data);
        })
    },
    renderLog: (req, res) => {
        let data = {
            scriptName: "log",
            page: {
                log: true
            }
        };
        innerRequest(req, '/api/checkpoints', (ret) => {
            data.checkpoints = ret;
            res.render('log', data);
        })
    }
}