const express = require("express")
const router = express.Router()
const User = require("../models/userschema")

router.get('/', (req,res) => {

    res.send("We are on users")

});

router.post('/', (req,res)=> {
    console.log(req.body) 
});


module.exports = router;