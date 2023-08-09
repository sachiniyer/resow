// import and instantiate express
const express = require("express") // CommonJS import style!
const mongoose = require('mongoose');
const axios = require("axios") // middleware for making requests to APIs
const morgan = require("morgan") // middleware for nice logging of incoming HTTP requests
const cors = require('cors') // allow cross origin requests (cors)
const cookieParser = require("cookie-parser")
require("dotenv").config({ silent: true }) // load environmental variables from a hidden file named .env

const app = express() // instantiate an Express object

//-------------------------------------IMPORT ROUTES----------------------------------------------------

const postsRoute = require('./routes/posts') // load route for posts
const userRoute = require('./routes/users') // load route for users
const mapRoute = require('./routes/map')

//-------------------------------------MIDDLEWARE BELOW----------------------------------------------------

// use the morgan middleware to log all incoming http requests
app.use(morgan("dev")) // morgan has a few logging default styles - dev is a nice concise color-coded style
// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data


app.use(cors())
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data
app.use(cookieParser())
// make 'public' directory publicly readable with static content
app.use("/static", express.static("public"))
app.use('/posts', postsRoute)
app.use('/users', userRoute)
app.use('/map', mapRoute)

dbUser = process.env.DB_USER
dbPass = process.env.DB_PWORD
dbHost = process.env.DB_HOST
dbPort = process.env.DB_PORT
dbName = process.env.DB_NAME
const connectionString = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', error => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB database');
});

db.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

//-------------------------------------ROUTES BELOW--------------------------------------------------------

// route for HTTP GET requests to the root document
app.get("/", (_, res) => {
  res.send("Hello world!")
})

app.get('/location', async (req, res) => {

  try {
    let long = req.query.long;
    let lat = req.query.lat;
    const url = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=' + long + "," + lat
    const response = await axios(url);

    console.log(response.data)
    res.json({ address: response.data.address.Address })
  }
  catch (err) {
    console.log({ message: err.message })
  }
})

app.use('/images', express.static('uploadedFiles'))

// export the express app we created to make it available to other modules
module.exports = app
