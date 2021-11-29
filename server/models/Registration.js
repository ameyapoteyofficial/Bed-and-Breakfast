const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    StartDate: Date,
    EndDate: Date,
    RoomID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    }
},{
    collection:'Booking Registration',
});

module.exports = mongoose.model("Booking Registration",registrationSchema);