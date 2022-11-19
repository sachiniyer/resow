const express = require("express")
const jwt = require("jsonwebtoken") // used for authentication with JSON Web Tokens
const router = express.Router()
const User = require("../models/userschema")

const { createTokens, validateToken } = require('./jwt-config')


router.get('/', async (req, res) => {
    //route for retrieving the list of all users
    try {
        const users = await User.find()
        res.json(users)
    }
    catch (err) {
        res.json({message: err.message, location: 'Retrieving users from DB'})
    }
})

/*//have to fis thix after the tokenization
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        res.json(user)
    }
    catch (err) {
        res.json({message: err.message})
    }
})*/

 //route for adding a new user (user registration page)
router.post('/register', async (req,res)=> {
    const user = new User({
        fullname: req.body.fullname,
        emailID: req.body.emailID,
        password: req.body.password,   //hash the password
        dob: req.body.dob,
        phone: req.body.phone,
        img: req.body.img //this one can be removed from this section
    });

    //jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

    try {

        //check here if the user exists already - if exists then throw error
        const savedUser = await user.save()
        res.send({
            success: true, 
            message: "User created successfully", 
            user: {
                id: savedUser._id, 
                emailID: savedUser.emailID
            }
        })
    }
    catch (err) {
        res.send({
            success: false, 
            message: err.message
        })
        console.log(err)
    }

})

//login router to check if the entered details are correct or not (Log In Page) - AUTHORIZATION and AUTHENTICATION
router.post('/logIn', async (req,res, )=> {

    try {
        //check if the user exists or not 
        const user = await User.findOne({emailID: req.body.emailID})
        if (!user) throw new Error("User not found")

        const dbPassword = user.password
        if(dbPassword != req.body.password) throw new Error("Incorrect password, try again")  //checking if the pasword match or not


        const payload = {
            id: user._id, 
            emailID: user.emailID
        }

        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "7d"})

        res.status(200).send({
            success: true, 
            message: "Logged in successfully", 
            token: "Bearer " + accessToken
        })

        //res.cookie("acces-token", accessToken, {maxAge: 60*60*24*30*1000})
        //res.json(user)
    }
    catch (err) {
        //next(err)
        res.json({message: err.message});
        console.log(err)
    }

})

router.get('/profile', async (req, res) => {
    try {
        //const user = await User.findById(req.params.userId)
        res.json("hello")
    }
    catch (err) {
        res.json({message: err.message})
    }
})


router.patch('/:userId', async (req, res) => {
    //route for updating a user profile (edit profile page)
    try {
        const updatedUser = await User.updateOne(
            { _id: req.params.userId },
            { $set: { fullname: req.body.fullname,
                      emailID: req.body.emailID,
                      password: req.body.password,
                      phone: req.body.phone,
                      img: req.body.img
                    } 
            })
        res.json(updatedUser)
    }
    catch (err) {
        res.json({message: err.message})
    }
    
})

router.delete('/:userId', async (req, res) => {
    //route for deleting a user
    try {
        const removedUser = await User.remove({ _id: req.params.userId })
        res.json(removedUser)
    }
    catch (err) {
        res.json({message: err.message})
    }
})



//--------------------------- SAVE POST ROUTERS RELATED TO USER -------------------------------------------------
router.get('/saved-posts/userId=:userId&postId=:postId', async (req, res) => {

    try {
        const user = await User.find(
            {
                _id: req.params.userId,
                savedPosts:req.params.postId
            }
        )
       
        res.json(user)
    }
    catch (err) {
        res.json({message: err.message})
    }

})

router.delete('/saved-posts/userId=:userId&postId=:postId', async (req, res) => {

    try {
        const user = await User.updateOne(
            {_id: req.params.userId},
            { $pull:{savedPosts:req.params.postId}}
        )
       
        res.json(user)
    }
    catch (err) {
        res.json({message: err.message})
    }

})

router.post('/saved-posts', async (req, res) => {

    try {
        const user  = await User.findById(req.body.userId);
        user.savedPosts.push(req.body.postId)
        
        updatedUser = await user.save()
        
        res.json(updatedUser)
    }
    catch (err) {
        res.json({message: err.message})
    }

})
module.exports = router;
