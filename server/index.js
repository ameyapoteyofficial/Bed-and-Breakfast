const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const dbConnect =  require('./config/dbConnect');
const usersRoute = require('./routes/usersRoute');
const adminRoute = require('./routes/adminRoute');
const error = require('./middleware/errorMiddlewareHandler');


dotenv.config();

//connect to the db

dbConnect();



app.use(express.json());

//Routes
app.use('/api/users',usersRoute);
app.use('/api/admin',adminRoute);
//error handler
app.use(error.errorMiddlewareHandler);

// console.log(process.env.JWT_SECRET_KEY);

//Port details
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is starting on PORT ${PORT}`);
})



