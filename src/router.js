const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const gameController = require('./controllers/gameController');


router.use(homeController);
router.use(authController);
router.use(gameController);
router.all('*', (req, res) => {
    res.redirect('/404');
})

module.exports = router;