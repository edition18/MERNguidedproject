const express = require("express");
const router = express.Router();


// @route GET api/auth
// @desc test route
// @access Public (ie no authorization needed)
router.get('/', (req,res) => res.send('auth route'));

module.exports = router;