const express = require('express'),
    bp = require('body-parser'),
    handlebars = require('express-handlebars'),
    app = express(),
    db = require('./models'),
    htmlrouter = require('./routes/html'),
    apirouter = require('./routes/api'),
    PORT = 3000;
//Use body parser
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
//Use handlebars view engine
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
//Routers
app.use('/', htmlrouter);
app.use('/api', apirouter);

db.sequelize
    .sync({})
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
