const router = require('express').Router();
const authServices = require('../services/authServices');
const bcrypt = require('bcrypt');
const { isAuth } = require('../middlewares/authMiddleware')

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/constants');

router.get('/register', (req, res) => {
    res.render('auth/register');
})

router.post('/register', async (req, res) => {
    const registerData = req.body;

    try {
        if (registerData.password != registerData.rePassword) {
            throw new Error('Password does not match!');
        }

        await authServices.createUser(registerData);
        res.redirect('/login');
    } catch (err) {
        const errorMessage = err.errors ? Object.values(err.errors)[0]?.message : err.message;
        res.render('auth/register', { error: errorMessage, registerData })
    }
})

router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.post('/login', async (req, res) => {
    const loginData = req.body;

    try {
        const user = await authServices.findUserByEmail(loginData.email);
        if (!user) {
            throw new Error('Email is not valid or there is no user with that email!!!');
        }

        const isPasswordValid = await bcrypt.compare(loginData.password, user.password);

        if (!isPasswordValid) {
            throw new Error('Password is not valid!');
        }

        const payload = {
            email: user.email,
            _id: user.id,
            username: user.username
        }

        console.log(JWT_SECRET);

        const jwtToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
        res.cookie('auth', jwtToken, { httpOnly: true });

        res.redirect('/');

    } catch (err) {
        const errorMessage = err.errors ? Object.values(err.errors)[0]?.message : err.message;
        res.render('auth/login', { error: errorMessage })
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})

module.exports = router;