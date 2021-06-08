require('dotenv').config()
const express = require('express')
const app = express()
const Auth = require('./code/auth')
var cors = require('cors')


var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true
}
app.use(cors(corsOptions))

const appAuth = new Auth(app);
appAuth.register();

app.listen(process.env.PORT, function () {
    console.log('Server started at port ' + process.env.PORT)
})