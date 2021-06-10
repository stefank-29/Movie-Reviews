const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const passport = require('passport');
const promisify = require('es6-promisify');
const expressValidator = require('express-validator');
const routes = require('./router/index');
const errorHandlers = require('./handlers/errorHandlers');
const cookieParser = require('cookie-parser');
require('./handlers/passport');

// create Express app
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'pictures')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);

app.use(expressValidator());

// app.use(flash);

app.use(
    session({
        secret: process.env.SECRET,
        key: process.env.KEY,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        cookie: { maxAge: 180 * 60 * 1000 },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

app.use(express.static(__dirname + '/public'));

// Handle Spa
app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
}); // svaka ruta

app.use(errorHandlers.notFound);

app.use(errorHandlers.flashValidationErrors);

module.exports = app;
