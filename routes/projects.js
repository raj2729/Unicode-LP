const express=require("express")
const mongoose = require("mongoose")
const router=express.Router()
const passport = require('passport');
const bodyparser = require("body-parser")
const passportLocalMongoose = require('passport-local-mongoose');
const authenticate = require("../authenticate")

router.use(bodyparser.json()) 

// Setting up a collection of PROJECT
let details_customer = require("../models/project")

router.use(function (req,res,next){
    console.log("Project Request done");
    next()
})

//Managing the routes
router
    .route("/")
    .post(authenticate.verifyUser , (req,res) => {
        let projectData = new details_project(req.body)

        async function createProject(){

            await projectData.save()
            await (res.status(200).json({message : "Project Details have been added"}));

        }
        createProject()
        .catch(err => {
            res.status(400)
            res.json({
                message : "Details of Project has not been added"
            })
        })    
    })
    .get((req,res) => {
  
        async function getProject(){

            await details_project.find()
            .then (response =>{
                res.json({
                    response
                })
            })

        }
        getProject()
        .catch(err => {
            res.json({
                message : "Error while loading Project data"
            })
        })
    })

router 
    .route("/:id")
    .get(authenticate.verifyUser , (req,res) => {

        async function getProjectById(){
            await details_project.find({"projectId" : req.params.id})
            .then(response =>{
                res.json({
                    response
                })
            })
        }

        getProjectById()
        .catch(err => {
            res.json({
                message : "Error while loading Project Data"
            })
        })
    })
    .put(authenticate.verifyUser , (req,res) => {

        async function updateProject(){
  
            await details_project.updateOne({"projectId" : req.body.projectId },{$set :{    
                "projectName" : req.body.projectName,
                "projectCustomer" : req.body.projectCustomer,
                "projectId" : req.body.projectId,
                "projectEmployeeId" : req.body.projectEmployeeId,
                "projectStartDate" : req.body.projectStartDate ,
                
            }}) 
            .then( response => {
                res.json({
                    message : "Project data has been Updated Successfully"
                })
            })

        } 
        updateProject()
        .catch(err => {
            res.json({
                message : "Error while Updating Project Data"
            })
        })
    })
    .delete(authenticate.verifyUser , (req,res) => {
 
        async function deleteProject(){

            await details_project.deleteOne({"projectId" : req.params.id})
            .then( 
                res.json({
                    message : "Project data has been deleted"
                })
            )
        }
        deleteProject()
        .catch(err => {
            res.json({
                message : "Error while Deleting Project Data"
            })
        })
    })

module.exports = router;