const Game = require('../models/Game');

const getAllGames = () => {
    return Game.find();
}

const createGame = (gameData) => {
    return Game.create(gameData);
}
module.exports = {
    getAllGames,
    createGame,
};