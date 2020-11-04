const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth")
const User = require("../../models/User")
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");

// @route GET api/auth
// @desc test route
// @access Public
router.get('/', auth, async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});


// @route POST api/auth
// @desc auth user and get token
// @access Public 
router.post('/', [
    check("email","please include valild email").isEmail(),
    check("password","pw required").exists()
],async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) { //if erroy output in array
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;
    //destructuring, we already know if it pases the if check
    //these keys exists and have valid values
    try {
       let user = await User.findOne({ email })
       // find the user in DB

       if (!user) {
           res.status(400).json({
               errors: [{ msg: "User doesnt exist!"}]
               // the above is a array of objects, with only 1 object with msg property
           }); 
       }

       //check if password matches
       const isMatch = await bcrypt.compare(password, user.password);

       if (!isMatch) {
        res.status(400).json({
            errors: [{ msg: "[PW] User doesnt exist!"}]
        }); 
       }

        const payload = {
            user: {
                id: user._id, 
                // we could have used id instead, mongoose has an abstraction 
            }
        }

        jwt.sign(payload, config.get("jwtSecret"), {
            expiresIn: 360000
        }, ((err, token) => {
            if (err) throw err;
            res.send({token});
            // send back token as a object
        }));

    } catch(err) {
        console.error(err.message);
        res.status(500).json.send("Server Error");
    }

}); 

module.exports = router;