const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../configs/constants');

function isAuth(req, res, next) {
    const token = req.cookies['auth'];

    if (!token) {
        res.locals = {};
        return next();
    }

    try {
        const user = jwt.verify(token, JWT_SECRET);
        res.locals.isAuthenticated = true;
        res.locals._id = user._id;
        return next()
    } catch (err) {
        res.clearCookie('auth');
        res.redirect('/login')
        return next();
    }
}

module.exports = {
    isAuth,
}