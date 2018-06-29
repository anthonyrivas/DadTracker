const passport = require('passport'),
    models = require("./../models"),
    User = models.user;

let out = module.exports = {
    renderLogin: function (req, res) {
        res.render('login');
    },
    login: function (req, res, next) {
        passport.authenticate('login', function (err, user, info) {
            if (err) { return next(err); }
            if (!user) {
                console.log('User not authenticated');
                return res.redirect('/user/login');
            }
            req.logIn(user, function (loginerr) {
                if (loginerr) {
                    console.log("Error while login: " + loginerr);
                    return next(loginerr);
                }
                req.session.messages = "Login successfull";
                req.session.authenticated = true;
                req.authenticated = true;
                return res.redirect('/');
            });
            //console.log( req.body );
            //res.redirect( '/' );
        })(req, res, next);
    },
    logout: function (req, res) {
        req.session.destroy(function (err) {
            res.redirect('/user/login');
        });
    },
    renderRegister: function (req, res) {
        res.render('register');
    },
    register: function (req, res, next) {
        passport.authenticate('register', function (err, user, info) {
            if (err) { return next(err); }
            if (!user) {
                // console.log( 'User not registered' );
                return res.redirect('/user/register');
            }
            // console.log( 'User registered!' );
            return res.redirect('/');
            //res.redirect( '/' );
        })(req, res, next);
    },
    renderSettings: function (req, res) {
        res.send('User settings page coming soon!');
    },
    updateSettings: function (req, res, next) {
        User.update(req.body, {
            where: {
                email: req.user.email
            }
        }).then(function (data) {
            res.send(data);
        }).catch(function (err) {
            console.log(err);
            return res.end('There was an error with this update');
        });
    }
};