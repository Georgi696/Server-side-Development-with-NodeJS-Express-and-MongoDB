const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var passport = require("passport-local-mongoose")

var User = new Schema({
    admin:{
        type:String,
        default:false
    }
});

User.plugin(passport);

module.exports = mongoose.model("User",User);