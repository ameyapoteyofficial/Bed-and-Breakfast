const mongoose = require('mongoose');

const dbConnect = () =>{
mongoose
.connect(process.env.MONGODB_URL, {
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
