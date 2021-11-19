const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const webTokens = require('jsonwebtoken');
const authMiddleWare = asyncHandler ( async(req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decodedToken = webTokens.verify(token,process.env.JWT_SECRET_KEY);
            const user = await User.findById(decodedToken.id);  
            req.user= user;
            next();

        } catch (error) {
            res.status(401);

            throw new Error('Not Authorized, Invalid Token!');
        }
    }
});

module.exports = authMiddleWare;