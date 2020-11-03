const express = require("express");
const connectDB = require("./config/db");
const app = express();

//connect to mongo
connectDB();

app.get('/', (req, res) => res.send("API running"));
//what the user see when they access http://localhost:5000/

app.use("/api/users", require("./routes/api/users"))
//any connection to /api/users will use routes in following file
app.use("/api/posts", require("./routes/api/posts"))
app.use("/api/auth", require("./routes/api/auth"))
app.use("/api/profile", require("./routes/api/profile"))


const PORT = process.env.PORT || 5000;
// if no environment port set, use 5000 (i.e for local use/default)

app.listen(PORT, () => console.log(`Server created on ${PORT}`))
//console message when server started
