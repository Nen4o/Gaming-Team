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

const updateGame = (gameData) => {
    return Game.findByIdAndUpdate(gameData._id, gameData);
}

const deleteGameById = (gameId) => {
    return Game.findByIdAndDelete(gameId);
}

module.exports = {
    getAllGames,
    createGame,
    getGameById,
    updateGame,
    deleteGameById,
};