const express = require("express")
const jwt = require("jsonwebtoken") // used for authentication with JSON Web Tokens
const passport = require("passport") 
const router = express.Router()
const User = require("../models/userschema")
const bcrypt = require('bcrypt');

const { jwtOptions, jwtStrategy } = require("./jwt-config.js") // import setup options for using JWT in passport
const { body, validationResult } = require('express-validator');
passport.use(jwtStrategy)


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

 //route for adding a new user (user registration page)
router.post('/register', body('emailID').isEmail(), body('phone').isMobilePhone(), async (req,res)=> {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(200).json({ message: errors.array()[0].param });
        }

        //check if the user exists with the same email or not 
        const user = await User.findOne({emailID: req.body.emailID})
        if (user) throw new Error("An account already exists with this email")
        

        if(!user){
            bcrypt.hash(req.body.password,10)
            .then(hashedPassword =>{
                const newUser = new User({
                    fullname: req.body.fullname,
                    emailID: req.body.emailID,
                    password: hashedPassword, 
                    dob: req.body.dob,
                    phone: req.body.phone,
                    img: req.body.img //this one can be removed from this section
                });
                newUser.save().then(
                    () =>{
                        res.status(200).send({
                            success: true,
                            message: "User created successfully",  
                            emailID: req.body.emailID,
                            password: req.body.password
                        })
                    }
                )
            })
            .catch(err =>{
                res.status(400).json({message: err.message});
                console.log(err)
            })
        }

    }
    catch(err) {
        //console.log("here bottom")
        res.json({message: err.message});
        console.log(err)
    }
})

//login router to check if the entered details are correct or not (Log In Page) - AUTHORIZATION and AUTHENTICATION
router.post('/login', body('emailID').isEmail(), async (req,res, )=> {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            //console.log(errors.array()[0].param)
            return res.status(200).json({ message: errors.array()[0].param });
        }

        if (!req.body.emailID || !req.body.password) {
            res
              .status(401)
              .json({ success: false, message: `no username or password supplied.` })
          }

        //check if the user exists or not 
        const user = await User.findOne({emailID: req.body.emailID})
        if (!user) throw new Error("User not found")

        const dbPassword = user.password
        bcrypt.compare(req.body.password,dbPassword)
        .then(validPass => {
                if (!validPass){
                    throw new Error("Incorrect password, try again")
                }
                else{
                    const payload = {
                        id: user._id, 
                        emailID: user.emailID
                    }
                    const accessToken = jwt.sign(payload, jwtOptions.secretOrKey, {expiresIn: "7d"})
                    res.status(200).send({
                        success: true, 
                        emailID: req.body.emailID,
                        message: "Logged in successfully", 
                        token: "Bearer " + accessToken
                    })
                }
            }  
        )
        .catch(err =>{
            res.status(400).json({message: err.message});
            console.log(err)
        })
       
    }
    catch (err) {
        res.json({message: err.message});
        console.log(err)
    }

})

router.get('/profile', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET );  
        let userId = decoded.id  
        console.log(userId)
        const user = await User.findById(userId)

        console.log(user)

        res.json({
            id: userId,
            fullname: user.fullname,
            emailID: user.emailID, 
            phone: user.phone,
            img: user.img
          })
    }
    catch (err) {
        res.json({message: err.message})
    }
})

//need to check if we need this router later since the user profile is fetched after authentication
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        res.json(user)
    }
    catch (err) {
        res.json({message: err.message})
    }
})


router.patch('/:userId', body('emailID').isEmail(), body('phone').isMobilePhone(),async (req, res) => {
    //route for updating a user profile (edit profile page)
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(200).json({ message: errors.array()[0].param });
        }

        const updatedUser = await User.updateOne(
            { _id: req.params.userId },
            { $set: { fullname: req.body.fullname,
                      emailID: req.body.emailID,
                      phone: req.body.phone,
                      img: req.body.img
                    } 
            })
        res.json({message:"ok"})
    }
    catch (err) {
        //console.log("here")
        console.log(err.message)
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
