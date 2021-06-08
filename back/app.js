require('dotenv').config()
const express = require('express')
const app = express()
const Auth = require('./code/auth')
var request = require('request');

const appAuth = new Auth(app);
appAuth.register();

app.all('/*', function (req, res) {
    req.pipe(request({
        url: process.env.FRONT_HOST + '/' + req.params[0],
        qs: req.query,
        method: req.method,
        jar: true,
        headers: req.headers
    }, function (error, response, body) {
        if (error)
            console.error('Wow, there is error!', error);
    })).pipe(res);
});

app.listen(process.env.PORT, function () {
    console.log('Server started at port ' + process.env.PORT)
})