var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session			= require('express-session'),
    mysql			= require('mysql');
var connInfo =  {
    connectionLimit: 65,
        acquireTimeout: 30000,
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '0000',
        database: 'testmaker',
        timezone: 'KST',
        waitForConnections:true
};
var mySqlConn		= mysql.createPool(connInfo);



mySqlConn.on('enqueue', function () {
    console.log('Waiting for available connection slot');
});

exports.mySqlConn	= mySqlConn;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var app = express();


app.use(session({
    key: 'sid', // 세션키
    secret: 'secret', // 비밀키
    saveUninitialized: false,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 60 // 쿠키 유효기간 1시간
    }
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
/*


*/



module.exports = app;
