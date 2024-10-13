const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    platform: {
        type: String,
        required: true,
    },
    boughtBy: {
        type: Array,
    },
    ownerId: {
        type: String,
    }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;