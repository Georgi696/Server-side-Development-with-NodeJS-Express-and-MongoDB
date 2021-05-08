var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./auth');
const mongoose = require('mongoose');
const config = require('./config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');
//var favoriteRouter = require('./routes/users');

const url = config.mongoURL;

const connect = mongoose.connect(url);

connect.then((db)=>{
    console.log("Connected to mongo server successfully...");
},(err)=>console.log("Error:",err));

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

  
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use(cookieParser('12345-09876'));


// function auth(req,res,next){
//   console.log(req.session);
//   if(!req.user)
//   {
//     var err = new Error('You are not authenticated');
//     err.status = 403;
//     return next(err);
//   }
//   else{
//     next();
//   }
// }
app.use(express.static(path.join(__dirname, 'public')));

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);
//app.use('/favorites',favoriteRouter);


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

module.exports = app;