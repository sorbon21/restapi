var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//-----------------------------------------

var account = require('./routes/account');
var accountstatus = require('./routes/accountstatus');
var accounttype = require('./routes/accounttype');
var ardoc = require('./routes/ardoc');
var docdet = require('./routes/docdet');
var docstatus 	= require('./routes/docstatus');
var doctype 	= require('./routes/doctype');
var index 		= require('./routes/index');
var note 		= require('./routes/note');
var orddet = require('./routes/orddet');
var orderstatus = require('./routes/orderstatus');
var ordertype 	= require('./routes/ordertype');
var periodtype 	= require('./routes/periodtype');
var plan 	= require('./routes/plan');
var plancategory 	= require('./routes/plancategory');
var planperiod 	= require('./routes/planperiod');
var planrate 	= require('./routes/planrate');
var resource 	= require('./routes/resource');
var salesorder 	= require('./routes/salesorder');
var salesperson 	= require('./routes/salesperson');
var subscription 	= require('./routes/subscription');
var subscrparam 	= require('./routes/subscrparam');
var substatus 	= require('./routes/substatus');
///------------------------------------------------
var orders 	= require('./routes/selects/orders');



//-----------------------------------------
//security
//-----------------------------------------
process.env.SECRET_KEY="wewe23lk32lk432k432;k432e32e32";
var autch = require('./routes/security/autch');
var signup = require('./routes/security/signup');
//-----------------------------------------------------

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//-----------------------------------
app.use('/', index);
app.use('/account', account);
app.use('/accountstatus', accountstatus);
app.use('/accounttype', accounttype);
app.use('/ardoc', ardoc);
app.use('/docdet', docdet);
app.use('/docstatus', docstatus);
app.use('/doctype', doctype);
app.use('/note', note);
app.use('/orddet', orddet);
app.use('/orderstatus', orderstatus);
app.use('/ordertype', ordertype);
app.use('/periodtype', periodtype);
app.use('/plan', plan);
app.use('/plancategory', plancategory);
app.use('/planperiod', planperiod);
app.use('/planrate', planrate);
app.use('/resource', resource);
app.use('/salesorder', salesorder);
app.use('/salesperson', salesperson);
app.use('/subscription', subscription);
app.use('/subscrparam', subscrparam);
app.use('/substatus', substatus);
app.use('/orders', orders);

//-----------------------------------------
//security
//-----------------------------------------
app.use('/autch', autch);
app.use('/signup', signup);

//-----------------------------------
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
