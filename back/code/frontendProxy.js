var request = require('request');

const register = function (app) {
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
}

module.exports = register;