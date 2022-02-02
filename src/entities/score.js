const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    },
    scores: {
        type: Object,
        required: true,
    },
}, {collections: 'scores', timestamps: true});


const Score = mongoose.model('Score', ScoreSchema);
module.exports = Score;




