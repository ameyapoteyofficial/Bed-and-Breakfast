const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const dbConnect =  require('./config/dbConnect');


// var db = monk('mongodb+srv://WPL-Project:WplFinalProject@cluster0.fqbmk.mongodb.net/test?authSource=admin&replicaSet=atlas-sl1khp-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true');
// var collection = db.get('WPLFinalProject');
// // console.log(collection);

//Passing User Data

//connect to the db

dbConnect();

app.use(express.json());

app.use(cors());


app.listen(5000, ()=>{
    console.log("Server is starting on PORT 5000");
})

// const DB_URI = "mongodb+srv://WPL-Project:WplFinalProject@cluster0.fqbmk.mongodb.net/WPLFinalProject?authSource=admin&replicaSet=atlas-sl1khp-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";


// mongoose
// .connect(DB_URI, {
// useUnifiedTopology: true,
// useNewUrlParser:true,
// })
// .then(() => {
// console.log("MongoDB connected!");
// })
// .catch((err) => {
// console.log("Unable to connect to DB. Reason: " + err);
// });

// mongoose.connection.db.listCollections().toArray(function(err, names) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         names.forEach(function(e,i,a) {
//             mongoose.connection.db.dropCollection(e.name);
//             console.log("--->>", e.name);
//         });
//     }
// });
app.post('/api/users/register', async (req,res) => {
    try{
        const {Name,Email,Password} = req.body;
        const user = await User.create({Name,Email,Password});
        res.send(user);
    }catch(error){
        console.log(error.message);
    }
});