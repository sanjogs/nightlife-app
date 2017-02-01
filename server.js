
'use strict'

var express = require("express");

var app = express();
require('dotenv').load();


app.get('/', function(req, res) {
    res.send("app is up");
});

app.listen(process.env.PORT, () => {
    console.log('listening');
})