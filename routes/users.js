const mongoose = require('mongoose')
const bodyparser = require("body-parser") 
const express=require("express")
const path =require("path")
const passport = require('passport');
const authenticate = require("../authenticate")

let User = require("../models/user")

const router=express.Router()
router.use(bodyparser.json())

router.get("/" , (req,res) => {
  
        async function getEmployees(){

            await User.find()
            .then (response =>{
                res.json({
                    response
                })
            })

        }
        getEmployees()
        .catch(err => {
            res.json({
                message : "Error while loading User Data"
            })
            
        })
    })

router.post("/signup", (req,res,next)=>{

    User.register( new User( {username : req.body.username}),
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
                res.json({

                    success : true,
                    status : "User registration Successful",
                    
                })
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

router.delete("/:username" , authenticate.verifyUser,async (req, res, next) => {
	try {
		await User.deleteOne({username : req.params.username});
		res.statusCode = 200;
		res.setHeader('Content-Type','application/json');
		res.json({
            message : "User data has been deleted"
        })
	} catch (err) {
		next(err);
	}
});


module.exports = router