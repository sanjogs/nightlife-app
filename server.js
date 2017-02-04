
'use strict'

var express = require("express");
var app = express();

var appRoute=require("./app/routes/index");
var apiRoute=require("./app/routes/api");

//load environment variables
require('dotenv').load();

//register app routes
appRoute(app);

//register api routes
apiRoute(app);

app.listen(process.env.PORT, () => {
    console.log('listening');
})