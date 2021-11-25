const mongoose= require('mongoose');

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
});

const bookingHistorySchema = new mongoose.Schema({
    Room : roomSchema,
    StartDate :  Date,

    EndDate : Date,

   BookingDate : Date,

   UserID : {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
       required : true,
   }
   },{
       collection: "Booking History",
       timestamps: true,
});

module.exports = mongoose.model("Booking History",bookingHistorySchema);
