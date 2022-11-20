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