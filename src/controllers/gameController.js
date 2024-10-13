const router = require('express').Router();
const gameServices = require('../services/gameServices');
const { isAuth } = require('../middlewares/authMiddleware');

const { JWT_SECRET } = require('../configs/constants');
const jwt = require('jsonwebtoken');


router.get('/catalog', async (req, res) => {
    try {
        const games = await gameServices.getAllGames().lean();
        res.render('game/catalog', { games });

    } catch (err) {
        console.log(err);
    }
})

router.get('/create', (req, res) => {
    res.render('game/create');
})

router.post('/create', async (req, res) => {
    const gameData = req.body;
    const token = req.cookies['auth'];

    try {
        const userToken = jwt.verify(token, JWT_SECRET);

        gameData.ownerId = userToken._id;
        await gameServices.createGame(gameData);
        res.redirect('/catalog');
    } catch (err) {
        console.log(err);
        res.redirect('/create');
    }
});

router.get('/details/:gameId', async (req, res) => {

    const gameId = req.params.gameId;

    try {
        const game = await gameServices.getGameById(gameId).lean();

        res.render('game/details', { game });
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;