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

router.use(function (req,res,next){
    console.log("Project Request handled");
    next()
})

//Managing the routes
router
    .route("/")
    .post(authenticate.verifyUser , (req,res) => {
        let projectData = new details_project(req.body)

        async function createProject(){

            await projectData.save()
            await (res.status(200).send("Project Details have been added"));

        }
        createProject()
        .catch(err => {
            res.status(400);
            res.send("Details of Project has not been added");
        })    
    })
    .get((req,res) => {
  
        async function getProject(){

            await details_project.find()
            .then (response =>{
                res.send(response);
            })

        }
        getProject()
        .catch(err => {
            res.send("Error while loading Project data")
        })
    })

router 
    .route("/:id")
    .get(authenticate.verifyUser , (req,res) => {

        async function getProjectById(){
            // await details_project.find({"projectId" : req.params.id})
            await details_project.findById(req.params.id)

            .then(response =>{
                res.send(response);
            })
        }

        getProjectById()
        .catch(err => {
            res.send("Error while loading Project Data")
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
                res.send("Project data has been Updated Successfully")
            })

        } 
        updateProject()
        .catch(err => {
            res.send("Error while Updating Project Data")
        })
    })
    .delete(authenticate.verifyUser , (req,res) => {
 
        async function deleteProject(){

            await details_project.deleteOne({"projectId" : req.params.id})
            .then( 
                res.send("Project data has been Deleted Successfully")
            )
        }
        deleteProject()
        .catch(err => {
             res.send("Error while Deleting Project Data")
        })
    })

module.exports = router;