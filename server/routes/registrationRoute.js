const express = require('express');
const registrationRoute = express.Router();
const registration = require('../models/registration');
const error = require('../middleware/errorMiddlewareHandler');
const asyncHandler = require('express-async-handler');

registrationRoute.get('/', asyncHandler(async (req,res) => {
    const roomID = req.body.roomID;
    const registrations = await registration.find({ 'RoomID': roomID });
    if(registrations){
        res.status(200);
        res.json(registrations);
    }
    else{
        res.status(500);
        throw new Error("Enter correct User id"); 
    }
})
);

registrationRoute.post('/', asyncHandler(async (req,res) => {
   
    const newRegistration = await registration.create(req.body);
    if(newRegistration){
        res.status(200);
        res.json(newRegistration);
    }
    else{
        res.status(500);
        throw new Error('Can not add to booking registration');
    }
})
);

module.exports = registrationRoute;