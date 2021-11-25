const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    Name : String,
    Number_of_Beds : Number,
    Area_in_sqft : Number,
    Max_Occupancy : Number,
    Bed_Type : String,
    Image : String,
    Price : Number,
    Description : String,
    Category : String,
},{
    collection:'Room',
    timestamps: true,
});


const cartSchema = new mongoose.Schema({
    Room : roomSchema ,
    StartDate: Date,
    EndDate: Date,
    UserID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
},{
    collection:'Cart',
    timestamps: true,
});

module.exports = mongoose.model("Cart",cartSchema);