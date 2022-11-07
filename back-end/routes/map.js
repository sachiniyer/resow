const express = require("express")
const router = express.Router()
const Post = require('../models/Post')

router.get('/', async (_, res) => {
    try {
        const posts = await Post.find()
        let returnobj = {}
        returnobj.type = "FeatureCollection"
        returnobj.features = []
        for (let i of posts) {
            returnobj.features.push({
                type: "Feature",
                id: i.id,
                geometry: {
                    type: "Point",
                    coordinates: [i.longitude, i.latitude],
                },
            })
            count++
        }
        res.json(returnobj)
    }
    catch (err) {
        res.json({ message: err, location: 'Retrieving posts from DB' })
    }
})

router.get('/feature', async (req, res) => {
    //route for retrieving the list of all posts
    try {
        let post = await Post.findById(req.query.id)
        let retobj = {}
        retobj.imgList = post.images
        retobj.profileURL = post.profileURL
        retobj.title = post.title
        retobj.location = "[ " + post.latitude + ", " + post.longitude + "]"
        res.json(retobj)
    }
    catch (err) {
        res.json({ message: err, location: 'Retrieving posts from DB' })
    }
})


module.exports = router
