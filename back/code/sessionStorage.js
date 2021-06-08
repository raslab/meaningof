const MongoStore = require('connect-mongo');

const createSessionStorage = function () {
    return MongoStore.create({
        mongoUrl: process.env.MONGO_CONNECTION_STRING,
        autoRemove: 'interval',
        autoRemoveInterval: 60
    })
}

module.exports = createSessionStorage;