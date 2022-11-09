const express = require("express")
const router = express.Router()
const User = require("../models/userschema")

router.get('/:userId', async (req, res) => {
    //route for querying the db for a particular user with userId when signed in
    try {
        const user = await User.findById(req.params.userId)
        res.json(user)
    }
    catch (err) {
        res.json({message: err.message})
    }
})

router.post('/', async (req,res)=> {
    //route for adding a new user (user registration page)

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
    //route for updating a user profile (edit profile page)
    try {
        const updatedUser = await User.updateOne(
            { _id: req.params.userId },
            { $set: { fullname: req.body.fullname,
                      emailID: req.body.emailID,
                      password: req.body.password,
                      phone: req.body.phone,
                      img: req.body.img } 
            })
        res.json(updatedUser)
    }
    catch (err) {
        res.json({message: err.message})
    }
    
})

router.get('/', async (req, res) => {
    //route for retrieving the list of all users
    try {
        const users = await User.find()
        res.json(users)
    }
    catch (err) {
        res.json({message: err.message, location: 'Retrieving posts from DB'})
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

router.get('/saved-posts/userId=:userId&postId=:postId', async (req, res) => {

    console.log(req.params.userId)
    console.log(req.params.postId)

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
