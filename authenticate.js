const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');
let LocalStrategy = require("passport-local").Strategy;
let User =require("./models/user")  
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt ;
const jwt = require("jsonwebtoken")
const config = require("./config")


// passport.use(new LocalStrategy(User.authenticate()))
exports.local = passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

exports.getToken = (user)=>{

    return jwt.sign(user , config.secretKey , 
    { expiresIn : 360000 } );//expires in 3600 seconds( 1 hour )

}

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();//included in authentication header as Bearer token in every subsequent requests 
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy( opts,( jwt_payload ,done) => {
    console.log("JWT payload : " , jwt_payload);
    User.findOne({
        _id : jwt_payload._id ,
    } ,(err,user) => {
        if(err){
            return done( err ,false );
        }
        else if(user) {
            return done(null , user);
        }
        else {
            return done(null , false) ;
        }
    } )
} ) )

exports.verifyUser = passport.authenticate("jwt" , {
    session : false,
} )//use token in authentication header and verifies user 

//Verify if admin flag is set for super secure routes
exports.verifyAdmin = passport.authenticate("jwt" ,(req, res, next) => {
    if(req.user.admin){
        return next();
    }
    else if(!req.user.admin){
        err = new Error('You are not authorized to perform this operation!');
        err.status = 403;
        return next(err);
    }
    else{
        return next(err);
    }
}
) 
