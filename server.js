
'use strict'

var express = require("express");
var app = express();

var app=require("./app/routes/app");
var api=require("./app/routes/api");

//load environment variables
require('dotenv').load();

//register app routes
app(app);

//register api routes
api(app);

app.listen(process.env.PORT, () => {
    console.log('listening');
})