var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
let session = require('express-session');
let sessionConfig = require('./configs/session-config');

let authMiddleware = require('./middlewares/auth');
let loginRouter = require('./routes/login-router');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
// app.use(express.json());
app.use(bodyParser.json()); //bodyparser 사용 설정
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(sessionConfig));
app.use(express.static(path.join(__dirname, 'public')));    // 인증 과정이 반드시 필요한 static route

app.use('/', loginRouter);

app.use('/', authMiddleware);
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    
    console.error('handling error : '+ err);

    if (req.xhr) {
        return res.status(err.status).json(err);
    } else {
        // render the error page
        res.status(err.status || 500);
        res.redirect('login');
    }
});

module.exports = app;
