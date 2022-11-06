// import and instantiate express
const express = require("express") // CommonJS import style!
const mongoose = require('mongoose');
const path = require("path")
const multer = require("multer") // middleware to handle HTTP POST requests with file uploads
const axios = require("axios") // middleware for making requests to APIs
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests
const postsRoute = require('./routes/posts') // load route for posts
const cors = require('cors') // allow cross origin requests (cors)
require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env

const app = express() // instantiate an Express object


//-------------------------------------MIDDLEWARE BELOW----------------------------------------------------

// use the morgan middleware to log all incoming http requests
app.use(morgan("dev")) // morgan has a few logging default styles - dev is a nice concise color-coded style
// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(cors())
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data
// make 'public' directory publicly readable with static content
app.use("/static", express.static("public"))
app.use('/posts', postsRoute)

dbUser = process.env.DB_USER
dbPass = process.env.DB_PWORD
DBString = process.env.DB_STRING

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}${DBString}`, () => {
    console.log('Connected to DB')
})

//-------------------------------------ROUTES BELOW--------------------------------------------------------

// route for HTTP GET requests to the root document
app.get("/", (req, res) => {
    res.send("Hello world!")
})

app.post('/sign-in', (req, res) => {
    res.send(req.body)
})

app.post("/users", (req, res) => {
    //route for making a post request to create a new user
    res.send("Hello world!")
})

app.get("/item-list", (req, res) => {

    axios
    .get(`${process.env.ITEM_LIST_URI}/?key=${process.env.KEY}`)
    .then(apiResponse => res.json(apiResponse.data)) // pass data along directly to client
    .catch(err => {
        console.error(err)
        res.status(400).json({
          error: err,
          status: 'failed to retrieve item list from the database',
        })
      }) // pass any errors to express

})

// placeholder for now. Will update when the authentication is done
app.get("/saved-post", (req, res) => {

    axios
    .get(`${process.env.ITEM_LIST_URI}/?key=${process.env.KEY}`)
    .then(apiResponse => res.json(apiResponse.data)) // pass data along directly to client
    .catch(err => {
        console.error(err)
        res.status(400).json({
          error: err,
          status: 'failed to retrieve item list from the database',
        })
      }) // pass any errors to express

})

// placeholder for now. Will update when the authentication is done
app.get("/past-upload", (req, res) => {

    axios
    .get(`${process.env.ITEM_LIST_URI}/?key=${process.env.KEY}`)
    .then(apiResponse => res.json(apiResponse.data)) // pass data along directly to client
    .catch(err => {
        console.error(err)
        res.status(400).json({
          error: err,
          status: 'failed to retrieve item list from the database',
        })
      }) // pass any errors to express

})

// get request from the front end when it needs the item details
app.get("/item/:itemId", (req, res) =>{
    route = `${process.env.ITEM_LIST_URI}`+"/"+req.params.itemId+`/?key=${process.env.KEY}`
    axios
    .get(route)
    .then(apiResponse => res.json(apiResponse.data)) // pass data along directly to client
    .catch(err => next(err)) // pass any errors to express
})

// post request when the user wants to save the post
app.post("/item/save", (req, res) => {
    
    const data = {
        user_id : req.body.user_id,
        post_id : req.body.post_id
    }

    const url = `${process.env.SAVE_POST_URI}`

    axios.post(url,data)
    .then((response) => {
        return res.json({
            message:"The post has been saved successfully",
            id:response.data.id   
        })
    })
    .catch(error =>{
        return res.json({
            message:"error"
        })
    })
})

// delete request when the user wants to unsave the post
app.delete("/item/save/:saveId", (req,res) => {

    axios.delete("https://635f28c83e8f65f283ad5a6c.mockapi.io/savepost"+"/"+req.params.saveId)
    .then(() =>{
        return res.json({
            message:"The post has been unsaved successfully"
        })
    })
    .catch(error =>{
        console.log(response)
        return res.json({
            message:"error"
        })
    })

})

app.delete("/item/:deleteId",(req,res) => {

    // =======================================================================
    //
    // MOCKAROO API DOESN'T SUPPORT DELETE
    // WILL BE UPDATED WHEN THE DB IS IMPLEMENTED
    //
    // axios.delete("random_URL_That_stores_item_details/"+req.params.deleteId)
    // .then(() =>{
    //     return res.json({
    //         message:"The post has been deleted successfully"
    //     })
    // })
    // .catch(error =>{
    //     console.log(response)
    //     return res.json({
    //         message:"error"
    //     })
    // })
    //
    // =======================================================================
    return res.json({
        message:"The post has been deleted successfully"
    })
})

        
// export the express app we created to make it available to other modules
module.exports = app