const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'config.env' })


async function generateJwtToken(id, nickname, claim){
    const token = await jwt.sign({id, nickname, claim}, process.env.SECRET_KEY, {expiresIn: process.env.EXPIRES_IN});
    return token;
}


async function verifyJwtToken(token){
    try{
        const result = await jwt.verify(token, process.env.SECRET_KEY);
        return result;
    }catch(error){
        return error;
    }
    
}


module.exports = {
    generateJwtToken,
    verifyJwtToken
}