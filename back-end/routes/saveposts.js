const express = require("express")
const router = express.Router()
const SavePost = require('../models/SavePost')

router.get('/', async (req, res) => {

    try {
        const saveposts = await SavePost.find()
        res.json(saveposts)
    }
    catch (err) {
        res.json({message: err, location: 'Retrieving posts from DB'})
    }
    
})

router.get('/:userId&:postId', async(req,res) => {

    console.log(req.params.postId)
    console.log(req.params.userId)
    try {
        const saveposts = await SavePost.find({userId:req.params.userId,postId:req.params.postId})
        res.json(saveposts)
    }
    catch (err) {
        res.json({message: err, location: 'Retrieving posts from DB'})
    }
})


router.post('/', async (req,res) => {

    console.log(req.body.postId)

    const savePost = new SavePost({
        userId : req.body.userId,
        postId : req.body.postId
    }) 
    try{
        const savedsavePost = await savePost.save()
        res.json(savedsavePost)
    }
    catch (err) {
        res.json({message:err})
    }

})


router.delete("/:savepostId", async (req,res) =>{ 

    try{
        const removedSavepost = await SavePost.remove({_id: req.params.savepostId})
        res.json(removedSavepost)
    }
    catch(err) {
        res.json({message: err})
    }

})

module.exports = router