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

// @route GET api/profile
// @desc  GET all profiles
// @access Public

router.get("/", async (req,res) => {
    try {
        const profiles = await Profile.find().populate('user',['name','avatar']);
        res.send(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    } 

})

// @route GET api/profile/user/user_id
// @desc  GET profile by user id
// @access Public

router.get("/user/:user_id", async (req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user',['name','avatar']);
        //findOne(key in DB, corresponding value match desired)

       if(!profile) {
            return res.status(400).json({msg: "profile not found!"});
        }

        res.send(profile);

    } catch (err) {
        console.error(err.message);
        if (err.kind == "ObjectId") {
            //err.kind attempts to match the key of the error
            return res.status(400).json({msg: "profile not found!"});
        }
        res.status(500).send("server error");
    } 

})

// @route DELTE api/profile
// @desc  delete profile, user and posts
// @access Private

router.delete("/", auth, async (req,res) => {
    try {
        await Profile.findOneAndRemove({user: req.user.id});
        await User.findOneAndRemove({_id: req.user.id});
        // there is no id field in USer db, only the default _id
        // note that User id is copied onto Profile (field user) so they are the same
        res.json({msg: "user deleted"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    } 

})


// @route PUT api/profile/experience (you could have POST as well)
// @desc  add profile experience
// @access Private

router.put("/experience", [auth, [
    check("title","title required").not().isEmpty(),
    check("company","company required").not().isEmpty(),
    check("from","from date required").not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }


    const {title,company,location,from,to,current,description} = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    };

    try {
        const profile = await Profile.findOne({user: req.user.id })

        profile.experience.unshift(newExp); //push new experience in front
        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;