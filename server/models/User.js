const mongoose = require('mongoose');

//Schema

const UserSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true,
    },
    Email:{
        type: String,
        required: true,
    },
    Password:{
        type:String,
        required: true,
    },
},{
    collection:'User',
    timestamps: true,
});

const User = mongoose.model('User',UserSchema);

module.exports = User;