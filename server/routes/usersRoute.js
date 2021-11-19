const express = require('express');

const usersRoute = express.Router();
const User = require('../models/User');


//registering users
usersRoute.post('/register', async (req,res) => {
    try{
        const {Name,Email,Password} = req.body;
        const user = await User.create({Name,Email,Password});
        res.send(user);
    }catch(error){
        console.log(error.message);
    }
});

//User Login
usersRoute.post('/login', async (req,res) => {
    try{
        
        res.send("Login Route");
    }catch(error){
        console.log(error.message);
    }
});

module.exports = usersRoute;