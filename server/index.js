const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const dbConnect =  require('./config/dbConnect');
const usersRoute = require('./routes/usersRoute');


//connect to the db

dbConnect();

app.use(express.json());

//Routes
app.use('/api/users',usersRoute);


app.listen(5000, ()=>{
    console.log("Server is starting on PORT 5000");
})



