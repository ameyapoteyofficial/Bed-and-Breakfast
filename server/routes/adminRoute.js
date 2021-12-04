const express = require('express');
const adminRoute = express.Router();

const Room = require('../models/Room');
const error = require('../middleware/errorMiddlewareHandler');
const asyncHandler = require('express-async-handler');

adminRoute.route('/create').post((req, res, next) => {
    Room.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
});

adminRoute.route('/').get((req, res) => {
    Room.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
});

adminRoute.route('/edit/:id').get((req, res) => {
    Room.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
});


adminRoute.route('/update/:id').put((req, res, next) => {
    Room.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error);
        } else {
            res.json(data);
            console.log('Room details updated successfully !');
        }
    })
});

adminRoute.route('/delete/:id').delete((req, res, next) => {
    Room.findByIdAndUpdate(req.params.id, {
        Deleted: true
    },(error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
            console.log("Room deleted");
        }
    })
})

module.exports = adminRoute;