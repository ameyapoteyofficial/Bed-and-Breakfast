const express = require('express');
const cartRoute = express.Router();

const Cart = require('../models/Cart');
const error = require('../middleware/errorMiddlewareHandler');
const asyncHandler = require('express-async-handler');

cartRoute.get('/', asyncHandler(async (req,res) => {
    const carts = await Cart.find({});
    if(carts){
        res.status(200);
        res.json(carts);
    }
    else{
        res.status(500);
        throw new Error('Cart is empty!');
    }
})
);

cartRoute.get('/getUserCarts', asyncHandler(async (req,res) => {
    const userID = req.body.UserID;
    const carts = await Cart.find({'UserID':userID});
    if(carts){
        res.status(200);
        res.json(carts);
    }
    else{
        res.status(500);
        throw new Error('Cart is empty!');
    }
})
);

cartRoute.get('/getOneCart', asyncHandler(async (req,res) => {
    const userID = req.body.UserID;
    const roomID = req.body.RoomID;
    const cart = await Cart.findOne({'UserID':userID, 'Room._id':roomID});
    if(cart){
        res.status(200);
        res.json(cart);
    }
    else{
        res.status(500);
        throw new Error('Cart is empty!');
    }
})
);

cartRoute.post('/', asyncHandler(async (req,res) => {
   
    const cart = await Cart.create(req.body);
    if(cart){
        res.status(200);
        res.json({
            _id: cart._id,
            Room: cart.Room,
            StartDate: cart.StartDate,
            EndDate: cart.EndDate,
            UserID: cart.UserID,
        });
    }
    else{
        res.status(500);
        throw new Error('Add to Cart');
    }
})
);

cartRoute.delete('/:id', asyncHandler(async (req,res) => {
    
    try{
        const cart = await Cart.findByIdAndDelete(req.params.id);
        res.status(200);
        res.json(cart);
    }
    catch(err){
        res.status(500);
        res.json(err);
    }
})
);

cartRoute.put('/:id',  asyncHandler(async (req,res) => {

    const cart = await Cart.findById(req.params.id);
    
    if(cart){
        const newCart = await Cart.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true,
                runValidators:true,
            }
        );
        res.status(200);
        res.json(newCart);
    }
    else{
        res.status(500);
        throw new Error('Update failed');
    }
})
);

module.exports = cartRoute;