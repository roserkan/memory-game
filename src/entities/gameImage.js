const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameImageSchema = new Schema({
    gameTypeId: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    }
}, {collections: 'gameImages', timestamps: true});


const GameImage = mongoose.model('GameImage', GameImageSchema);
module.exports = GameImage;