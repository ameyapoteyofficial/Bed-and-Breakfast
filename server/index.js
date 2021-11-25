const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const dbConnect =  require('./config/dbConnect');
const usersRoute = require('./routes/usersRoute');
const adminRoute = require('./routes/adminRoute');
const cartRoute = require('./routes/cartRoute');
const bookingHistoryRoute = require('./routes/bookingHistoryRoute');
const error = require('./middleware/errorMiddlewareHandler');
const bookingHistory = require('./models/bookingHistory');


dotenv.config();

//connect to the db

dbConnect();



app.use(express.json());

//Routes
app.use('/api/users',usersRoute);
app.use('/api/admin',adminRoute);
app.use('/api/cart',cartRoute);
app.use('/api/bookinghistory',bookingHistoryRoute);

//error handler
app.use(error.errorMiddlewareHandler);

// console.log(process.env.JWT_SECRET_KEY);

//Port details
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is starting on PORT ${PORT}`);
})



