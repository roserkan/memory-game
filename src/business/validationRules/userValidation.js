const Joi = require('joi');


const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).max(14).required() ,
    claim: Joi.string()
});




module.exports = schema;