const mongoose = require('./mongooseConnection');

const UserPost = new mongoose.model('UserPost', {
    title: String,
    content: String,
    publisher: String,
    publishTime: Number
});

module.exports = UserPost;