const passport = require('passport')
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const createSessionStorage = require('./sessionStorage')
const User = require('./authUserModel')
const checkAuth = require('./authCheck');

class AppAuth {

    constructor(app) {
        this.app = app;
    }

    #initBasic = function () {
        this.app.use(session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
            store: createSessionStorage()
        }));
        this.app.use(passport.initialize());
        this.app.use(passport.session())

        passport.use(User.createStrategy());
        passport.serializeUser(function (user, done) {
            done(null, user.id);
        });

        passport.deserializeUser(function (id, done) {
            User.findById(id, function (err, user) {
                done(err, user);
            });
        });
    }

    #initGoogleAuth = function () {
        passport.use(new GoogleStrategy({
            clientID: process.env.AUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            callbackURL: '/api/auth/google/callback'
        },
            function (accessToken, refreshToken, profile, cb) {
                User.findOrCreate(
                    {
                        googleId: profile.id,
                        userName: profile.displayName,
                        userPicture: (profile.photos && profile.photos.length > 0) ? profile.photos[0].value : ''
                    }, function (err, user) {
                        return cb(err, user);
                    });
            }
        ));

        this.app.get('/api/auth/google',
            passport.authenticate('google', { scope: ['profile'] }));

        this.app.get('/api/auth/google/callback',
            passport.authenticate('google', { failureRedirect: '/login' }),
            function (req, res) {
                res.redirect('/login/success');
            });
    }

    #initFacebookAuth = function () {
        passport.use(new FacebookStrategy({
            clientID: process.env.AUTH_FACEBOOK_APP_ID,
            clientSecret: process.env.AUTH_FACEBOOK_SECRET,
            callbackURL: '/api/auth/facebook/callback'
        },
            function (accessToken, refreshToken, profile, cb) {
                User.findOrCreate(
                    {
                        facebookId: profile.id,
                        userName: profile.displayName
                    }, function (err, user) {
                        return cb(err, user);
                    });
            }
        ));

        this.app.get('/api/auth/facebook',
            passport.authenticate('facebook'));

        this.app.get('/api/auth/facebook/callback',
            passport.authenticate('facebook', { failureRedirect: '/login' }),
            function (req, res) {
                res.redirect('/login/success');
            });
    }

    #userInfo = function () {

        this.app.get('/api/user/logout', (req, res) => {
            req.logout();
            res
                .status(200)
                .send({ status: 200 });
        })


        this.app.get('/api/user', checkAuth, (req, res) => {
            let user = {
                userId: req.user._id,
                userName: req.user.userName,
                userIcon: req.user.userPicture
            }
            if (req.user.isAdmin) {
                user.isAdmin = true
            }
            res
                .status(200)
                .json({
                    status: 200,
                    user: user
                })
        })
    }

    register() {
        this.#initBasic()
        this.#initGoogleAuth()
        this.#initFacebookAuth()
        this.#userInfo()
    }
}

module.exports = AppAuth