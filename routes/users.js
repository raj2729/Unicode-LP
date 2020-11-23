const mongoose = require('mongoose')
const bodyparser = require("body-parser") 
const express=require("express")
const path =require("path")
const passport = require('passport');
const authenticate = require("../authenticate")

let User = require("../models/user")

const router=express.Router()
router.use(bodyparser.json())

router.route('/')
    .get(authenticate.verifyUser ,authenticate.verifyAdmin , async (req,res,next) => {
  
        try{

            let response = await User.find()
            res.send(response)
            
        }
        catch(err) {
            res.send("Error while loading User Data")
            
        }
    })

router.post("/signup",async (req,res,next)=>{

    User.register( new User( { name : req.body.name , username : req.body.username , password : req.body.password , admin : req.body.admin }),
    req.body.password , (err , user ) => {   

        if(err){
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json" )
            res.json({
                err : err,
            })
        }
        else{

           passport.authenticate("local")(req,res , () => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json" )
                res.send("User registration Successful")
           })
        }

    } )

} )

router.post("/login", passport.authenticate("local") , (req,res) => {
    //SInce we are using passport here it autometically checks for any error we need not write it 

    let token = authenticate.getToken({ _id : req.user._id });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json" )
    res.json({

        success : true,
        status : "User Login Successful",
        token : token,
                    
    })

} );

router.get("/logout" , (req,res,next) => {
    
    res.redirect("/");
} )

router.delete("/:id" ,authenticate.verifyUser , authenticate.verifyAdmin ,async (req, res, next) => {
	try {
		await User.findOneAndDelete({"_id" : req.params.id})
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.send("User data has been deleted")
	} 
    catch (err) {
		next(err);
	}
});

module.exports = router