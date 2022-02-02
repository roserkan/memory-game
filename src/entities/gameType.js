const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameTypeSchema = new Schema({
    gameType: {
        type: String,
        unique: true,
        required: true
    },
    imagePath: {
        type: String,
        required: true,
        unique: true
    },
}, {collections: 'gameTypes', timestamps: true});


const GameType= mongoose.model('GameType', GameTypeSchema);
module.exports = GameType;