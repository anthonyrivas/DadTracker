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
            page: {
                home: true
            },
            images: []
        }
        innerRequest(req, '/api/checkpoints', (ret) => {
            ret.forEach(element => {
                if (element.imageUrl !== null) {
                    data.images.push(element);
                }
            });
            res.render('home', data);
        })
    },
    renderMessages: (req, res) => {
        let data = {
            page: {
                messages: true
            }
        };
        innerRequest(req, '/api/messages', (ret) => {
            data.messages = ret;
            res.render('messages', data);
        })
    },
    renderCheckpoints: (req, res) => {
        let data = {
            page: {
                checkpoints: true
            }
        };
        innerRequest(req, '/api/checkpoints', (ret) => {
            data.checkpoints = ret;
            res.render('checkpoints', data);
        })
    }
}