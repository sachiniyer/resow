const express = require("express")
const router = express.Router()
const User = require("../models/userschema")

router.get('/', (req,res) => {

    res.send("We are on users")

});

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
        const savedUser = await user.save();
        res.json(savedUser);
    }
    catch (err) {
        res.json({message: err})
    }

});

module.exports = router;