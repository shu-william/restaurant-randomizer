const mongoose = require("mongoose");
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;

// Self-Hosted Production Variables
// const dbName = "restaurant_randomizer_DB";
// mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`, {

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>console.log(`Connected to the database!`))
    .catch((err)=>console.log('Something went wrong while connecting to the database ', err));