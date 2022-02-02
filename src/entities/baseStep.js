const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BaseStepSchema = new Schema({
    steps: {
        type: Object,
        required: true
    },
    
}, {collections: 'baseSteps', timestamps: true, minimize: true});


const BaseStep = mongoose.model('BaseStep', BaseStepSchema);
module.exports = BaseStep;