const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");


// @route GET api/users
// @desc test route
// @access Public (ie no authorization needed)
router.post('/', [
    check("name","Name is required").not().isEmpty(),
    check("email","please include valild email").isEmail(),
    check("password","please include pw of at least length 6").isLength({min: 6})
],(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    res.send("register success");

}); //placeholder text

module.exports = router;