const express = require("express");
const connectDB = require("./config/db");
const app = express();

//connect to mongo
connectDB();

app.get('/', (req, res) => res.send("API running"));
//what the user see when they access http://localhost:5000/

const PORT = process.env.PORT || 5000;
// if no environment port set, use 5000 (i.e for local use/default)

app.listen(PORT, () => console.log(`Server created on ${PORT}`))
//console message when server started
