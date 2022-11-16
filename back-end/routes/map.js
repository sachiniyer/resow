const express = require("express")
const router = express.Router()
const Post = require('../models/Post')
const User = require("../models/userschema")

router.get('/', async (_, res) => {
    try {
        const posts = await Post.find()
        let retObj = {}
        for (let i of posts) {
            if (!(i.id && i.latitude && i.longitude))
                return res.sendStatus(500)
        }
        retObj.type = "FeatureCollection"
        retObj.features = []
        for (let i of posts) {
            retObj.features.push({
                type: "Feature",
                id: i.id,
                geometry: {
                    type: "Point",
                    coordinates: [i.longitude, i.latitude],
                },
                properties: {}
            })
        }
        res.json(retObj)
    }
    catch (err) {
        res.json({ message: err.message, location: 'Retrieving posts from DB' })
    }
})

router.get('/feature', async (req, res) => {
    let post = await Post.findById(req.query.id)
    let retObj = {}
    if (!(post.images && post.owner && post.title && post.latitude && post.longitude))
        return res.sendStatus(500)
    retObj.owner = post.owner
    let seller = await User.findById(post.owner)
    if (!(seller.img && seller.fullname))
        return res.sendStatus(500)
    retObj.sellerName = seller.fullname
    retObj.profile = seller.img
    retObj.imgList = post.images
    retObj.title = post.title
    retObj.location = "[ " + post.latitude + ", " + post.longitude + "]"
    res.json(retObj)
})


module.exports = router
