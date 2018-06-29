const express = require('express'),
    bp = require('body-parser'),
    handlebars = require('express-handlebars'),
    bCrypt = require('bcrypt-nodejs'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    session = require('express-session'),
    app = express(),
    db = require('./models'),
    htmlrouter = require('./routes/html'),
    apirouter = require('./routes/api'),
    userrouter = require('./routes/user'),
    PORT = 3000;
//Use body parser
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
//Use handlebars view engine
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
//User auth middleware
app.use(session({ secret: 'tacos', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
//Public File Server
app.use(express.static('public'));
//Routers
app.use('/', htmlrouter);
app.use('/api', apirouter);
app.use('/user', userrouter);
//Use passport strategy
require('./config/passport/passport')(passport, db.User);

db.sequelize
    .sync({ /*force: true*/ })
    .then(function () {
        console.log('Database connection successful');
        app.listen(PORT, err => {
            if (err) throw err;
            console.log("App running at localhost:" + PORT);
        })
    })
    .error((err) => {
        console.error(err);
    })
