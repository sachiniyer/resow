// import and instantiate express
const express = require("express") // CommonJS import style!
const mongoose = require('mongoose');

const app = express() // instantiate an Express object
// we will put some server logic here later...
const path = require("path")

const multer = require("multer") // middleware to handle HTTP POST requests with file uploads
const axios = require("axios") // middleware for making requests to APIs
require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests
const Post = require('./models/Post')

// use the morgan middleware to log all incoming http requests
app.use(morgan("dev")) // morgan has a few logging default styles - dev is a nice concise color-coded style
// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data
// make 'public' directory publicly readable with static content
app.use("/static", express.static("public"))

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

app.get('/signIn'), (req, res) => {
    res.send("Signin!")
}

app.post("/users"), (req, res) => {
    //route for making a post request to create a new user
    res.send("Hello world!")
}

app.get('/posts'), (req, res) => {
    //route for retrieving the list of posts/or for querying the db for a particular post
    res.send("On Posts!")
}

app.post('/posts'), (req, res) => {
    //route for making a post request to create a new post
}

// export the express app we created to make it available to other modules
module.exports = app