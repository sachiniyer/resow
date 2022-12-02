const express = require("express")
const router = express.Router()
const Post = require('../models/Post')
const User = require("../models/userschema")

function randomNumber() {
    max = 0.000099
    min = 0.000000
    return Math.random() * (max - min) + min
}

router.get('/', async (_, res) => {
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
                coordinates: [i.longitude + randomNumber(), i.latitude + randomNumber()],
            },
            properties: {}
        })
    }
    res.json(retObj)
})

router.get('/feature', async (req, res) => {
    let post = await Post.findById(req.query.id)
    console.log(post.images)
    console.log(post.owner)
    console.log(post.title)
    console.log(post.latitude)
    console.log(post.longitude)
    let retObj = {}
    if (!(post.images && post.owner && post.title && post.latitude && post.longitude))
        return res.sendStatus(500)
    retObj.owner = post.owner
    let seller = await User.findById(post.owner)
    console.log(seller)
    if (!(seller.fullname))
        return res.sendStatus(500)
    retObj.sellerName = seller.fullname
    retObj.profile = seller.img
    retObj.imgList = post.images
    retObj.title = post.title
    retObj.location = post.location
    res.json(retObj)
})


module.exports = router
