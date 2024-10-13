const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../configs/constants');

function isAuth(req, res, next) {
    const token = req.cookies['auth'];

    if (!token) {
        res.locals.isAuthenticated = false;
        return next();
    }

    try {
        jwt.verify(token, JWT_SECRET);
        res.locals.isAuthenticated = true;
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