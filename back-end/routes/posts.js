const express = require("express")
const multer = require('multer')
const multerS3 = require('multer-s3')
const S3Client = require("@aws-sdk/client-s3").S3Client
const router = express.Router()
const Post = require('../models/Post')
const User = require('../models/userschema')
const { getDistance, sortedList } = require('../geocode/location')

const createS3Client = () => {
    return new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
    });
}

const s3 = createS3Client();
var upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: process.env.AWS_BUCKET_NAME,
        key: function (req, file, cb) {
            cb(null, file.originalname)
        },
    })
})

router.get('/', async (req, res) => {
    //route for retrieving the list of all posts
    try {
        const posts = await Post.find()
        res.json(posts.reverse())
    }
    catch (err) {
        res.json({ message: err.message, location: 'Retrieving posts from DB' })
    }
})


router.get('/longitude=:longitude&latitude=:latitude', async (req, res) => {

    try {
        const posts = await Post.find()

        longitude = parseFloat(req.params.longitude)
        latitude = parseFloat(req.params.latitude)

        res.json(sortedList(longitude, latitude, posts))
    }
    catch (err) {
        res.json({ message: err.message, location: 'Retrieving posts from DB' })
    }
})

router.get('/past-uploads/:userId', async (req, res) => {
    try {
        const pastUploads = await Post.find(
            { owner: req.params.userId }
        )
        res.json(pastUploads.reverse())
    }
    catch (err) {
        res.json({ message: err.message })
    }
})

router.get('/saved-posts/userId=:userId', async (req, res) => {
    try {
        const user = await User.find({ _id: req.params.userId })
        if (user.length === 0) {
            res.json([])
        }
        postIdList = user[0].savedPosts

        const savedPosts = await Post.find(
            { _id: { $in: postIdList } }
        )
        res.json(savedPosts.reverse())
    }
    catch (err) {
        res.json({ message: err.message })
    }
})

router.get('/:postId', async (req, res) => {
    //route for querying the db for a particular post with postId
    try {
        const post = await Post.findById(req.params.postId)
        res.json(post)
    }
    catch (err) {
        res.json({ message: err.message })
    }
})

router.delete('/:postId', async (req, res) => {
    //route for deleting a post
    try {
        const removedPost = await Post.deleteOne({ _id: req.params.postId })
        res.json(removedPost)
    }
    catch (err) {
        res.json({ message: err.message })
    }
})

router.patch('/:postId', async (req, res) => {
    //route for updating a post, includes only the parameters which should be updatable (update front-end in future to have this functionality)
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            {
                $set: {
                    title: req.body.title,
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
        res.json({ message: err.message })
    }
})


router.post('/', upload.array('files'), async function (req, res, next) {
    let imgPaths = []
    if (req.files.length) {
        let files = req.files
        for (let file of files) {
            imgPaths.push(file.location)
        }
        console.log(imgPaths)
        //route for making a post request to create a new post
        const post = new Post({
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            owner: req.body.owner,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            images: imgPaths
        })

        const savedPost = await post.save()
        res.json(savedPost)
    }
    else {
        res.status(500).send({ success: false, message: 'Oops... something went wrong!' })
    }

})

module.exports = router
