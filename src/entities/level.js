const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LevelSchema = new Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    },
    level: {
        type: Object,
        required: true,
    },
}, {collections: 'levels', timestamps: true, minimize:false});


const Level = mongoose.model('Level', LevelSchema);
module.exports = Level;



