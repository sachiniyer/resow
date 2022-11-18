const {sign, verify} = require("jsonwebtoken")


//this function creates a token and returns it to the place where it is being imported
const createTokens = (user) => {
    const accessToken = sign({emailID: user.emailID, id: user.id}, "jsonsecretToken")
    return accessToken
}


module.exports = {createTokens}