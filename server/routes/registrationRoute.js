const express = require('express');
const registrationRoute = express.Router();
const registration = require('../models/registration');
const authMiddleWare = require('../middleware/authMiddleWare');
const error = require('../middleware/errorMiddlewareHandler');
const asyncHandler = require('express-async-handler');

registrationRoute.get('/',  asyncHandler(async (req,res) => {
    const roomID = req.body.roomID;
    const registrations = await registration.find({'RoomID': roomID });
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

// registrationRoute.get('/filtered',  asyncHandler(async (req,res) => {
//     const roomID = req.body.roomID;
//     const startDate = req.body.startDate;
//     const endDate = req.body.endDate;

//     const registrations = await registration.find({ 'RoomID': roomID });

//     if(registrations){
//         const filtered = [];
//         registrations.forEach(function(registration){
//             if(! (new Date(registration.EndDate) < new Date(startDate) || new Date(registration.StartDate) > new Date(endDate) )){
//                 filtered.push({"StartDate":registration.StartDate, "EndDate":registration.EndDate });
//             }
//         });

//         res.status(200);
//         res.json(filtered);
//     }
//     else{
//         res.status(500);
//         throw new Error("Enter correct User id"); 
//     }
// })
// );

registrationRoute.get('/filtered',  asyncHandler(async (req,res) => {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const roomArray = req.body.array;
    const registrations = await registration.find({});

    if(registrations){
        registrations.forEach(function(registration){
            if( !(new Date(registration.EndDate) < new Date(startDate) || new Date(registration.StartDate) > new Date(endDate) )){
                let index = -1;
                let i = 0;
                roomArray.forEach(function(roomid){
                    if(roomid.localeCompare(registration.RoomID)==0){
                        index = i;
                    }
                    i++;
                })
                if(index > -1){
                    roomArray.splice(index, 1);
                }
            }
        });

        res.status(200);
        res.json(roomArray);
    }
    else{
        res.status(500);
        throw new Error("Not successful!"); 
    }
})
);

registrationRoute.post('/',  asyncHandler(async (req,res) => {
   
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