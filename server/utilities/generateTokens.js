const token = require('jsonwebtoken');

const generateToken = (userId) =>{
    return token.sign({id: userId},'sampleKey',{
        expiresIn: '30d',
    });
};

module.exports = generateToken;