const userPost = require('./userPostModel')
const express = require('express');
const UserPost = require('./userPostModel');

const registerUserPostsApi = function (app) {
    app.use(express.json({ type: 'application/json' }));

    app.post('/api/userPost', (req, res) => {
        if (!req.isAuthenticated()) {
            res.json({ status: 401 });
            return
        }

        const json = req.body;
        UserPost.create({
            ...json,
            publisher: req.user.id,
            publishTime: Date.now()
        }, function (err, post) {
            if (err) {
                res.json({ status: 502, message: err })
            } else {
                res.json({
                    status: 201, posts: [{
                        id: post._id,
                        title: post.title,
                        content: post.content,
                        publisher: post.publisher,
                        publishTime: post.publishTime
                    }]
                })
            }
        });
    })

    app.get('/api/userPost', (req, res) => {
        if (!req.isAuthenticated()) {
            res.json({ status: 401 });
            return
        }
        getUserPosts(req.user.id, req, res)
    });

    const getUserPosts = function (userId, req, res) {

        UserPost.find({
            publisher: userId
        }, function (err, posts) {
            if (err) {
                res.json({ status: 502, message: err })
            } else {
                res.json({
                    status: 200, posts: posts.map(post => {
                        return {
                            id: post._id,
                            title: post.title,
                            content: post.content,
                            publisher: post.publisher,
                            publishTime: post.publishTime
                        }
                    })
                })
            }
        });
    }

    app.get('/api/userPost/:userId', (req, res) => {
        if (!req.isAuthenticated()) {
            res.json({ status: 401 });
            return
        }

        const json = req.body;
        UserPost.findAll({
            publisher: req.params.userId
        }, function (err, post) {
            if (err) {
                res.json({ status: 502, message: err })
            } else {
                res.json({
                    status: 201, posts: [{
                        id: post._id,
                        title: post.title,
                        content: post.content,
                        publisher: post.publisher,
                        publishTime: post.publishTime
                    }]
                })
            }
        });
    });
}

module.exports = registerUserPostsApi;