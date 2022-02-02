const Joi = require('joi');


const schema = Joi.object({
    gameType: Joi.string().required(),
    imagePath: Joi.string()
});




module.exports = schema;