const express=require("express")
const mongoose = require("mongoose")
const router=express.Router()
const passport = require('passport'); 
const bodyparser = require("body-parser")
const passportLocalMongoose = require('passport-local-mongoose');
const authenticate = require("../authenticate")
 
router.use(bodyparser.json()) 

// Setting up a collection of PROJECT
let details_project = require("../models/project")

// router.use(function (req,res,next){
//     console.log("Project Request handled");
//     next()
// })

//Managing the routes
router
    .route("/")
    .post(authenticate.verifyUser , async (req,res,next) => {
        let projectData = new details_project(req.body)

        try{

            await projectData.save()
            res.status(200).send("Project Details have been added");

        }
        catch(err){
            res.send("Details of Project has not been added");
        }    
    })
    .get(async (req,res,next) => {
  
        try{

            let response = await details_project.find()
            res.send(response);

        }
        catch(err) {
            res.send("Error while loading Project data")
        }
    })

router 
    .route("/:id")
    .get(authenticate.verifyUser ,async (req,res,next) => {

        try{
            // await details_project.find({"projectId" : req.params.id})
            let response = await details_project.findById(req.params.id)

            res.send(response);
        }
        catch(err) {
            res.send("Error while loading Project Data")
        }
    })
    .put(authenticate.verifyUser , async (req,res,next) => {

        try{
  
            await details_project.findOneAndUpdate( req.params.projectId ,{$set : req.body },{ new : true}) 
            res.statusCode = 200;
            res.send("Project data has been Updated Successfully");

        } 
        catch(err){
            res.send("Error while Updating Project Data")
        }
    })
    .delete(authenticate.verifyUser ,authenticate.verifyAdmin ,async (req,res,next)=> {
 
        try{

            await details_project.findOneAndDelete({"projectId" : req.params.id})
            res.send("Project data has been Deleted Successfully")
            
        }
        catch(err) {
             res.send("Error while Deleting Project Data")
        }
    })

module.exports = router;