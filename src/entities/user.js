const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        max: 16,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    claim: {
        type: String,
        default: 'user'
    }
}, {collections: 'users', timestamps: true});


const User = mongoose.model('User', UserSchema);
module.exports = User;