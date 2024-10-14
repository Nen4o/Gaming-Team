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
    if (!res.locals.isAuthenticated) {
        res.redirect('/404');
    }

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
        const userId = res.locals._id;

        const isOwner = game.ownerId == userId ? true : false;
        const isUserBought = game.boughtBy.find((usersId) => usersId == userId);

        res.render('game/details', { game, isOwner, isUserBought });
    } catch (err) {
        console.log(err);
    }
})

router.get('/buy/:gameId', async (req, res) => {
    const gameId = req.params.gameId;

    try {
        const game = await gameServices.getGameById(gameId);

        game.boughtBy.push(res.locals._id);

        await gameServices.updateGame(game);
        res.redirect('/details/' + gameId);

    } catch (err) {
        console.log(err);
    }

})

router.get('/edit/:gameId', async (req, res) => {
    const gameId = req.params.gameId;

    try {
        const game = await gameServices.getGameById(gameId).lean();
        if (res.locals._id != game._id) {
            return res.redirect('/404');
        }
        res.render('game/edit', { game })
    } catch (err) {
        console.log(err);
    }
})

router.post('/edit/:gameId', async (req, res) => {
    const gameId = req.params.gameId;
    const updatedData = req.body;


    try {
        updatedData._id = gameId;
        await gameServices.updateGame(updatedData);
        res.redirect('/404');
    } catch (err) {
        console.log(err);
    }
})

router.get('/delete/:gameId', async (req, res) => {
    const gameId = req.params.gameId;

    try {
        const game = await gameServices.getGameById(gameId);

        if (game.ownerId != res.locals._id) {
            return res.redirect('/details/' + gameId);
        }

        await gameServices.deleteGameById(gameId);
        res.redirect('/catalog');
    } catch (err) {

    }
})

module.exports = router;