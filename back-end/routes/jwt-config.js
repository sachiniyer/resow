const passportJWT = require("passport-jwt")
const JwtStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt
const User = require("../models/userschema")

let jwtOptions = {}

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); //extracts the token string exclusing the bearer part from the header - also validates the token
jwtOptions.secretOrKey = process.env.JWT_SECRET 

const jwtStrategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    //console.log("JWT payload received", jwt_payload) // debugging

    User.findOne({id: jwt_payload.id}, function(err, user) {
        if (err) {
            return next(err, false);
        }
        if (user) {
            return next(null, user);
        } else {
            return next(null, false);
        }
    });
})

module.exports = {
    jwtOptions,
    jwtStrategy,
}

/*const {sign, verify} = require("jsonwebtoken")

//this function creates a token and returns it to the place where it is being imported
const createTokens = (user) => {
    const accessToken = sign({emailID: user.emailID, id: user.id}, "jsonsecretToken")
    return accessToken
}

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"]

    if(!accessToken){ //don't have a access token then return this error
        return res.status(400).json({error: "User not authenticated!"})
    }

    try{
        const validateToken = verify(accessToken,"jsonsecretToken")
        if(validateToken){
            req.authenticated = true
            return next()
        }
    }
    catch(err){
        res.json({message: err.message})
    }
}


module.exports = {createTokens, validateToken}*/