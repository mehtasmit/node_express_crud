const express = require('express');
const mysql = require('mysql');
const expressValidator = require('express-validator');
//const myConnection=require('express-myconnection');
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser');
const session= require('express-session');
const flash = require('express-flash');
//const config=require('./config');
const app = express();
const routes = require('./routes/routes');
const path = require('path');
const methodOverride = require('method-override')
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/public'));
//app.use(myConnection(mysql,config.database,'pool'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser('keyboard cat'));
app.use(session({ 
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  }))
app.use(flash());
app.use(bodyParser.json());
app.use('/', routes);
app.listen(3000, function () {
    console.log("App started at port 3000!!");
});