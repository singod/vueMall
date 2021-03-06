var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var config = require('./config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goodsRouter = require('./routes/goods');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine(".html", ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    // 全局请求拦截
    if(req.cookies.userId){  // 用户已经登录
        next();
    }else{  // 用户未登录
        if(!config.IGNORED_CHECKED_URLS.includes(req.path)){
            res.json({
                code: 1,
                count: 0,
                msg: "用户未登录~",
                data: []
            });
        }else{
            next();
        }
    }
});

// app.use('/', indexRouter);
app.use(config.URL_PREFIX + '/users', usersRouter);
app.use(config.URL_PREFIX + '/goods', goodsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    // res.render('error');
    res.json({
        code: 1,
        count: 0,
        msg: "服务器内部错误",
        data: []
    });
});

module.exports = app;
