
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , item = require('./routes/item') 
  , email = require('./routes/email')
  , http = require('http')
  , path = require('path')
  , mongoose= require('mongoose')
  , nodemailer = require('nodemailer');



var connect_db = 'mongodb://myuser:HvYxOZFOoL5J2QREjSuf@dbh15.mongolab.com:27157/heroku_app25047261';

mongoose.connect(connect_db);

var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + connect_var);
});

 
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/items', item.list);
app.get('/email', email.reply);
app.post('/email', email.send);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
