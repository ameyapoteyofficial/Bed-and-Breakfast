const mongoose = require('mongoose');

const dbConnect = () =>{
    const DB_URI = "mongodb+srv://WPL-Project:WplFinalProject@cluster0.fqbmk.mongodb.net/WPLFinalProject?authSource=admin&replicaSet=atlas-sl1khp-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";


mongoose
.connect(DB_URI, {
useUnifiedTopology: true,
useNewUrlParser:true,
})
.then(() => {
console.log("MongoDB connected!");
})
.catch((err) => {
console.log("Unable to connect to DB. Reason: " + err);
});
}

module.exports = dbConnect;
