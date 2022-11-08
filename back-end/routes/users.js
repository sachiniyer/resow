const express = require("express")
const router = express.Router()
const User = require("../models/userschema")

router.get('/:userId', async (req, res) => {
    //Bhavicka should work on this
    //route for querying the db for a particular user with postId when signed in
    try {
        const post = await User.findById(req.params.postId)
        res.json(post)
    }
    catch (err) {
        res.json({message: err.message})
    }
})

router.post('/', async (req,res)=> {

    const user = new User({
        fullname: req.body.fullname,
        emailID: req.body.emailID,
        password: req.body.password,
        dob: req.body.dob,
        phone: req.body.phone,
        img: req.body.img
    });

    try {
        const savedUser = await user.save()
        res.json(savedUser)
    }
    catch (err) {
        res.json({message: err})
        console.log(err)
    }

})

router.patch('/:userId', async (req, res) => {
    //route for updating a user profile (edit profile page), updates just the title for now
    
})

module.exports = router;