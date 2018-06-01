var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require('path');
var api = require('./routes/index');
var db = require('./configSql/sql');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views/Nueva carpeta'))
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static( 'public'));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  coockie: {
    maxAge: (5*60*60*1000)
  }
}));


app.use('/', api);

app.listen(3001)
