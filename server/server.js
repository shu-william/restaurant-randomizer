const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Development Frontend URI
// app.use(cors({ origin:"http://localhost:3000", credentials:true }));
app.use(cors({ origin:"https://orangix.onrender.com", credentials:true }));

require("./config/mongoose.config");
require("./routes/yelp_api.route")(app);
require("./routes/user.route")(app);
    
app.listen(port, () => console.log(`Listening on port: ${port}`) );
