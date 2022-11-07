const express = require("express")
const router = express.Router()
const Post = require('../models/Post')

router.get('/', async (_, res) => {
    try {
        const posts = await Post.find()
        let retObj = {}
        retObj.type = "FeatureCollection"
        retObj.features = []
        let count = 0
        for (let i of posts) {
            retObj.features.push({
                type: "Feature",
                id: i.id,
                geometry: {
                    type: "Point",
                    coordinates: [i.longitude, i.latitude],
                },
            })
            count++
        }
        res.json(retObj)
    }
    catch (err) {
        res.json({ message: err.message, location: 'Retrieving posts from DB' })
    }
})

router.get('/feature', async (req, res) => {
    try {
        let post = await Post.findById(req.query.id)
        let retObj = {}
        retObj.imgList = post.images
        retObj.profileURL = post.profileURL
        retObj.title = post.title
        retObj.location = "[ " + post.latitude + ", " + post.longitude + "]"
        res.json(retObj)
    }
    catch (err) {
        res.json({ message: err.message, location: 'Retrieving posts from DB' })
    }
})


module.exports = router
