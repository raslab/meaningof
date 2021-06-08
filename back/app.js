require('dotenv').config()
const express = require('express')
const app = express()
const Auth = require('./code/auth')
const frontendProxyRegisterer = require('./code/frontendProxy')
const registerSearchApi = require('./code/search')
const userPostsApiRegisterer = require('./code/userPost')

app.use(express.json({ type: 'application/json' }));

const appAuth = new Auth(app);
appAuth.register();

userPostsApiRegisterer(app);
registerSearchApi(app);


frontendProxyRegisterer(app);


app.listen(process.env.PORT, function () {
    console.log('Server started at port ' + process.env.PORT)
})