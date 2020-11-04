const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");


// @route GET api/profile/me
// @desc GET current users profile
// @access Private (needs a token)
router.get('/me', auth, async (req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate("user",["name","avatar"]);
        // find a user that pertains to the request user id
        // remember the Profile schema has a user field
        // that is linked to the id of the "user" database
        // populate allows us to grab the name and avatar from the "user" database
        // because the profile db doesnt have it 

        if(!profile) {
            return res.status(400).json({msg: "there is no such profile"})
        }

        res.json(profile);
    } catch(err) {
        console.error(err.message)
        res.status(500).send("server error");
    }
})

// @route POST api/profile/
// @desc create or update user profile
// @access Private 

router.post("/",[auth,[
    check("status","status required").not().isEmpty(),
    check("skills","skills required").not().isEmpty()
] ], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log("hi");
        return res.status(400).json({errors: errors.array()})
    }

    const {company, website, location, bio, status,githubusername, skills, youtube, facebook, twitter, instagram, linkedin} = req.body;
    // destructure and pull everything from req.body


    //build profile fields
    const profileFields = {}; //init object
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills) {
        profileFields.skills = skills.split(',').map(i => i.trim());
    }
    if(youtube) profileFields.youtube = youtube;
    if(twitter) profileFields.twitter = twitter;
    if(facebook) profileFields.facebook = facebook;
    if(linkedin) profileFields.linkedin = linkedin;
    if(instagram) profileFields.instagram = instagram;

    try {
        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) { //if no profile
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields }, //$set finds matching key and enter the values
                { new: true } // true means return modified doc rather than original
            );
            return res.json(profile);
        }

        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
        
    } catch(err) {

    }
})



module.exports = router;