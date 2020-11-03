const express = require("express");
const router = express.Router();


// @route GET api/users
// @desc test route
// @access Public (ie no authorization needed)
router.get('/', (req,res) => res.send('user route')); //placeholder text

module.exports = router;