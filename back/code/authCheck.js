const checkAuth = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res
            .status(401)
            .json({ status: 401 });
        return
    }
    next();
}

module.exports = checkAuth;