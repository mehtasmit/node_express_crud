var mysql= require('mysql');
var config=require('./config');
connection = mysql.createConnection(config.database);
module.exports=connection;