const express = require('express');
const bookingHistoryRoute = express.Router();

const bookingHistory = require('../models/bookingHistory');

const cart = require('../models/Cart');

const error = require('../middleware/errorMiddlewareHandler');
const asyncHandler = require('express-async-handler');


bookingHistoryRoute.get("/", asyncHandler(async (req,res) => {
    const bookings = bookingHistory.find({ UserID: req.user.id });
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

module.exports = bookingHistoryRoute;
