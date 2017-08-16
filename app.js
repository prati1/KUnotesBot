var express = require('express');
var natural = require('natural');
var tokenizer = new natural.WordTokenizer();
console.log(tokenizer.tokenize("this is hard, it's really hard."))
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var images = require('./routes/images');
var filesave = require('./routes/filesave');
var download = require('./routes/download');
var upload = require('./routes/upload');
var computer = require('./routes/computer');
var chatbot = require('./routes/chatbot');

var mongoose = require('mongoose');
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/kunotes_db');
var db = mongoose.collection;

var fs = require('fs');

/*app.use(require('express-session')({
    key: 'session',
    secret: 'SUPER SECRET SECRET',
    store: require('mongoose-session')(mongoose)
}));*/


app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));


/*app.get('/', function(req, res){
   if(req.session.page_views){
      req.session.page_views++;
      res.send("You visited this page " + req.session.page_views + " times");
   } else {
      req.session.page_views = 1;
      res.send("Welcome to this page for the first time!");
   }
});*/

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/images', images);
app.use('/filesave', filesave);
app.use('/download',download);
app.use('/upload',upload);
/*app.use('./soe',soe);*/
app.use('/computer',computer);
app.use('/chatbot',chatbot);
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


/*var sess;

app.get('/login',function(req,res){
  sess=req.session;
  if(sess.id)
  {
    res.redirect('/upload');
  }
  else{
  res.render('login');
  }
});

app.post('/login',function(req,res){
  sess=req.session; 
  sess.id=req.body.id;
  res.end('done');
});

app.get('/admin',function(req,res){
  sess=req.session;
  if(sess.id)  
  {
    res.write('<h1>Hello '+sess.id+'</h1><br>');
    res.end('<a href='+'/logout'+'>Logout</a>');
  }
  else
  {
    res.write('<h1>Please login first.</h1>');
    res.end('<a href='+'/'+'>Login</a>');
  }

});

app.get('/logout',function(req,res){
  
  req.session.destroy(function(err){
    if(err){
      console.log(err);
    }
    else
    {
      res.redirect('/');
    }
  });

});*/

module.exports = app;
