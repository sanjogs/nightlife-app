
'use strict'

var express = require("express");
var app = express();
var mongoose=require("mongoose");
var passport=require("passport");
var session = require('express-session');

//load environment variables
require('dotenv').load();

require('./app/config/passport')(passport);

var appRoute=require("./app/routes/index");
var apiRoute=require("./app/routes/api");

// set the static files location 
app.use(express.static(__dirname + '/public')); 

app.use(session({
	secret: 'nightLifeApp',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(process.env.DB_URL);
mongoose.Promise = global.Promise;

//register api routes first
apiRoute(app);
//register app routes
appRoute(app,passport);

app.listen(process.env.PORT, () => {
    console.log('listening');
})