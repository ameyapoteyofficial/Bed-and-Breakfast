const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Schema

const UserSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true,
    },
    Email:{
        type: String,
        required: true,
        unique:true,
    },
    Password:{
        type:String,
        required: true,
    },
},{
    collection:'User',
    timestamps: true,
});

UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
});

//Verify Creds

UserSchema.methods.isPasswordCorrect = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.Password);
}

const User = mongoose.model('User',UserSchema);

module.exports = User;