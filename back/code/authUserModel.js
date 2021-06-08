const mongoose = require('./mongooseConnection');
const findOrCreate = require('mongoose-findorcreate');
const passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    googleId: String,
    facebookId: String,
    userName: String,
    userPicture: String
});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model('User', userSchema);

module.exports = User;