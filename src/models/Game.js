const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [4, 'The name should be at least four characters. ']
    },
    imageUrl: {
        type: String,
        required: true,
        match: [/^https?:\/\//, 'The game image should start with "http://" or "https://"']
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'The price should be positive number!']
    },
    description: {
        type: String,
        required: true,
        minLength: [10, 'The description should be at least ten characters long.']
    },
    genre: {
        type: String,
        required: true,
        minLength: [2, 'The genre should be at least two characters long.']
    },
    platform: {
        type: String,
        required: true,
        enum: ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX', 'The platform must be one of the following options: "PC", "Nintendo", "PS4", "PS5", "XBOX"']
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