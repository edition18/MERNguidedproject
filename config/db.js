const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

mongoose.connect(db);

const connectDB = async () => {
    try {
        await mongoose.connect(db, {useNewUrlParser: true});
        //useNewUrlParser is an option we passed
        // since old UrlParser is deprecated
        // the above returns a promise so 
        // we add await (since async!)
        console.log("DB connected!");
    } catch(err) {
        console.error(error.message);
        process.exit(1);
        //Exit process with failure
    }
}

module.exports = connectDB;