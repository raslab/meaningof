const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useUnifiedTopology: true, useNewUrlParser: true });

module.exports = mongoose