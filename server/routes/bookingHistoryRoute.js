const express = require('express');
const bookingHistoryRoute = express.Router();

const bookingHistory = require('../models/bookingHistory');

const cart = require('../models/Cart');

const error = require('../middleware/errorMiddlewareHandler');
const asyncHandler = require('express-async-handler');


bookingHistoryRoute.get("/", asyncHandler(async (req,res) => {
    const userID = req.body.userID;
    const bookings = await bookingHistory.find({ 'UserID': userID });
    if(bookings){
        res.status(200);
        res.json(bookings);
    }
    else{
        res.status(500);
        throw new Error("Enter correct User id"); 
    }
})
);

bookingHistoryRoute.post('/', asyncHandler(async (req,res) => {
   
    const booking = await bookingHistory.create(req.body);
    if(booking){
        res.status(200);
        res.json(booking);
    }
    else{
        res.status(500);
        throw new Error('Can not add to booking history');
    }
})
);

module.exports = bookingHistoryRoute;
