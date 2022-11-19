const {sign, verify} = require("jsonwebtoken")


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


module.exports = {createTokens, validateToken}