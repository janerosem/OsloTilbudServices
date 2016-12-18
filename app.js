var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/******************/
var mongoose = require('mongoose'),
    assert = require('assert');

var Products = require('./models/products');
var User = require('./models/users');
//Payment endpoint and analytics endpoint

// Connection URL
var url = 'mongodb://localhost:27017/products';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log("Connected correctly to server");

});
/******************/

var routes = require('./routes/index');
var users = require('./routes/users');
var productRouter = require('./routes/productRouter');


var app = express();   // Express to implement the routes

// view engine setup
;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade')
//app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/users', users);
app.use('/products', productRouter);







module.exports = app;
