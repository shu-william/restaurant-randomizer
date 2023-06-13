const mongoose = require("mongoose");
const dbName = "restaurant_randomizer_DB";

mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>console.log(`Connected to ${dbName}!`))
    .catch((err)=>console.log('Something went wrong while connecting to the database ', err));      
