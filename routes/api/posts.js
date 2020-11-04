const express = require("express");
const router = express.Router();


// @route POST api/posts
// @desc register user
// @access Public (ie no authorization needed)
router.post('/', (req,res) => {
    
    res.send('posts route');

});

module.exports = router;