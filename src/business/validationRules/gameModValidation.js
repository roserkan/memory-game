const Joi = require('joi');


const schema = Joi.object({
    gameMod: Joi.string().required() 
});




module.exports = schema;