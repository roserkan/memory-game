const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameModSchema = new Schema({
    gameMod: {
        type: String,
        unique: true,
        required: true
    },
}, {collections: 'gameModes', timestamps: true});


const GameMod= mongoose.model('GameMod', GameModSchema);
module.exports = GameMod;