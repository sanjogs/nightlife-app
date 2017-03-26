'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	twitter: {
		id: String,
		name: String,
		username: String
	},
	lastSearch:String
});

module.exports = mongoose.model('User', User);