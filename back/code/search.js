const UserPost = require('./userPostModel');

const registerSearchApi = function (app) {

    function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };

    app.get('/api/search', (req, res) => {
        if (!req.query.q) {
            res
                .status(400)
                .json({ status: 400, message: 'Please specify search query' })
        }

        const query = new RegExp(escapeRegex(req.query.q), 'gi');
        UserPost.find({
            $or: [
                { 'title': { $regex: query } },
                { 'content': { $regex: query } }
            ]
        }, (err, posts) => {
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
        })
    })

    app.get('/api/latest', (req, res) => {

        UserPost.find({})
            .sort({ publishTime: -1 })
            .limit(10)
            .exec((err, posts) => {
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
            })
    })
}

module.exports = registerSearchApi;