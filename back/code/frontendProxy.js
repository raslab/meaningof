const request = require('request')
const express = require('express')
const path = require("path")

const register = function (app) {
    if (process.env.DEV) {
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
    } else {
        app.use(express.static('public'));
        app.get("*", (req, res) => {
            res.sendFile(path.join(__dirname, "../public", "index.html"));
        });
    }
}

module.exports = register;