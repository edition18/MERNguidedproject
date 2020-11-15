const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require("path"); //core node.js module to maniplate file paths

//connect to mongo
connectDB();

//init Middleware
app.use(express.json({ extended: false }));


app.use("/api/users", require("./routes/api/users"))
//any connection to /api/users will use routes in following file
app.use("/api/posts", require("./routes/api/posts"))
app.use("/api/auth", require("./routes/api/auth"))
app.use("/api/profile", require("./routes/api/profile"))

// serve static assets in production
if(process.env.NODE_ENV ==="production") {
    // set static folder, being client/build folder
    app.use(express.static("client/build"));


    // serve the index.html file
    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, "client" ,"build","index.html"));
    });
    // asterisk = anything apart from the api ABOVE
}

const PORT = process.env.PORT || 5000;
// if no environment port set, use 5000 (i.e for local use/default)

app.listen(PORT, () => console.log(`Server created on ${PORT}`))
//console message when server started
