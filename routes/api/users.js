const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route GET api/users
// @desc test route
// @access Public (ie no authorization needed)
router.post('/', [
    check("name","Name is required").not().isEmpty(), 
    check("email","please include valild email").isEmail(),
    check("password","please include pw of at least length 6").isLength({min: 6})
],async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) { //if erroy output in array
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password} = req.body;
    //destructuring, we already know if it pases the if check
    //these keys exists and have valid values
    try {
       let user = await User.findOne({ email })

       if (user) {
           return res.status(400).json({
               errors: [{ msg: "User exists already!"}]
               // the above is a array of objects, with only 1 object with msg property
           }); 
       }

       const avatar = gravatar.url({
           s: "200", //size
           r: "pg", // no nudity
           d: "mm"// default image
       })

       user = new User({
           name,
           email,
           avatar,
           password
       }) //other than avatar, other fields are from req.body 
       // this only creates an instance, not saved yet!

       const salt = await bcrypt.genSalt(10);
       user.password = await bcrypt.hash(password, salt);
       await user.save();
       
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