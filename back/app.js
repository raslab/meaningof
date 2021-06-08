require('dotenv').config()
const express = require('express')
const app = express()
const Auth = require('./code/auth')
const frontendProxyRegisterer = require('./code/frontendProxy')
const userPostsApiRegisterer = require('./code/userPost')

const appAuth = new Auth(app);
appAuth.register();

userPostsApiRegisterer(app);
frontendProxyRegisterer(app);


app.listen(process.env.PORT, function () {
    console.log('Server started at port ' + process.env.PORT)
})