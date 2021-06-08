const express = require('express');
const UserPost = require('./userPostModel');
const checkAuth = require('./authCheck');

const registerUserPostsApi = function (app) {
    app.use(express.json({ type: 'application/json' }));

    app.post('/api/userPost', checkAuth, (req, res) => {
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

    app.get('/api/userPost', checkAuth, (req, res) => {
        UserPost.find({
            publisher: req.user.id
        }, function (err, posts) {
            if (err) {
                res
                    .status(502)
                    .json({ status: 502, message: err })
            } else {
                res
                    .status(200)
                    .json({
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
    });

    app.get('/api/userPost/:postId', checkAuth, (req, res) => {
        const json = req.body;
        UserPost.findOne({
            _id: req.params.postId
        }, function (err, post) {
            if (err) {
                res
                    .status(502)
                    .json({ status: 502, message: err })
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

    app.delete('/api/userPost/:postId', checkAuth, (req, res) => {
        const postId = req.params.postId;
        UserPost.findOne({
            _id: postId
        }, function (err, post) {
            if (err || !post) {
                res
                    .status(502)
                    .json({ status: 502, message: err })
            } else if (post.publisher !== req.user.id && !req.user.isAdmin) {
                res
                    .status(403)
                    .json({ status: 403, message: 'Only post author can delete post!' })
                return
            } else {
                UserPost.deleteOne({ _id: postId }, function (err) {
                    if (err) {
                        res
                            .status(502)
                            .json({ status: 502, message: err })
                    } else {
                        res
                            .status(202)
                            .json({
                                status: 202,
                                message: 'Post ' + req.params.postId + ' deleted'
                            })
                    }
                })
            }
        });
    });
}

module.exports = registerUserPostsApi;