const Game = require('../models/Game');

const getAllGames = () => {
    return Game.find();
}

const createGame = (gameData) => {
    return Game.create(gameData);
}

const getGameById = (gameId) => {
    return Game.findById(gameId);
}

module.exports = {
    getAllGames,
    createGame,
    getGameById,
};