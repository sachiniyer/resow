const express = require("express")
const router = express.Router()
const Post = require('../models/Post')
const User = require('../models/userschema')
const {getDistance,sortedList} = require('../geocode/location')


router.get('/', async (req, res) => {
    //route for retrieving the list of all posts
    try {
        const posts = await Post.find()
        res.json(posts)
    }
    catch (err) {
        res.json({message: err.message, location: 'Retrieving posts from DB'})
    }
})


router.get('/longitude=:longitude&latitude=:latitude', async (req, res)=> {

    try{
        const posts = await Post.find()

        longitude = parseFloat(req.params.longitude)
        latitude = parseFloat(req.params.latitude) 

        res.json(sortedList(longitude,latitude,posts))
    }
    catch (err) {
        res.json({message: err.message, location: 'Retrieving posts from DB'})
    }
})

router.get('/past-uploads/:userId', async (req,res) => {
    try {
        const pastUploads = await Post.find(
            {owner:req.params.userId}
        )
        res.json(pastUploads)
    }
    catch (err) {
        res.json({message: err.message})
    }
})

router.get('/saved-posts/:userId',async(req,res)=>{
    try{
        const user = await User.findById(req.params.userId)
        postIdList = user.savedPosts

        const savedPosts = await Post.find(
            {_id:{$in:postIdList}}
        )
        res.json(savedPosts)
    }
    catch (err){
        res.json({message: err.message})
    }
})

router.get('/:postId', async (req, res) => {
    //route for querying the db for a particular post with postId
    try {
        const post = await Post.findById(req.params.postId)
        res.json(post)
    }
    catch (err) {
        res.json({message: err.message})
    }
})

router.delete('/:postId', async (req, res) => {
    //route for deleting a post
    try {
        const removedPost = await Post.deleteOne({ _id: req.params.postId })
        res.json(removedPost)
    }
    catch (err) {
        res.json({message: err.message})
    }
})

router.patch('/:postId', async (req, res) => {
    //route for updating a post, includes only the parameters which should be updatable (update front-end in future to have this functionality)
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            { $set: { title: req.body.title,
                      description: req.body.description,
                      timeEnd: req.body.timeEnd,
                      location: req.body.location,
                      latitude: req.body.latitude,
                      longitude: req.body.longitude,
                      images: req.body.images
                    } 
            })
        res.json(updatedPost)
    }
    catch (err) {
        res.json({message: err.message})
    }
})

router.post('/', async (req, res) => {
    //route for making a post request to create a new post
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        timeStart: req.body.timeStart,
        timeEnd: req.body.timeEnd,
        owner: req.body.owner,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        location:req.body.location,
        images: req.body.images
    })

    try {
        const savedPost = await post.save()
        res.json(savedPost)
    }
    catch (err) {
        res.json({message: err.message})
    }
})

module.exports = router
