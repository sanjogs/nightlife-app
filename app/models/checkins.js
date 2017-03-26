'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CheckInSchema = new Schema({
    businessId:String,
    userID:Schema.Types.ObjectId
});


module.exports = mongoose.model('CheckIn', CheckInSchema);