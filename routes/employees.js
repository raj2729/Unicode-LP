const express=require("express")
const mongoose = require("mongoose")
const router=express.Router()
const passport = require('passport');
const bodyparser = require("body-parser")
const passportLocalMongoose = require('passport-local-mongoose');
const authenticate = require("../authenticate")

router.use(bodyparser.json())

//Setting up a collection/model of EMPLOYEE
let details_employee = require("../models/employee")

router.use(function (req,res,next){
    console.log("Employee Request successfully handled");
    next()
})

//Managing the routes
router
    .route("/")
 
    .post(authenticate.verifyUser , (req,res) => {
        let employeeData = new details_employee(req.body)

        async function createEmployee(){

            await employeeData.save()
            await (res.status(200).json({message : "Employee Details have been added"}));

        }
        createEmployee()
        .catch(err => {
            res.status(400)
            res.json({
                message : "Details of Employee has not been added"
            })
        })    
    })
    
    .get((req,res) => {
  
        async function getEmployees(){

            await details_employee.find()
            .then (response =>{
                res.json({
                    response
                })
            })

        }
        getEmployees()
        .catch(err => {
            res.json({
                message : "Error while loading Employee Data"
            })
            
        })
    })



router 
    .route("/:id")
    .get(authenticate.verifyUser , (req,res) => {

        async function getEmployeeById(){
            await details_employee.find({"employeeId" : req.params.id})
            .then(response =>{
                res.json({
                    response
                })
            })
        }

        getEmployeeById()
        .catch(err => {
            res.json({
                message : "Error while loading Employee Data"
            })
        })
    })
    .put(authenticate.verifyUser , (req,res) => {

        async function updateEmployee(){
  
            await details_employee.updateOne({"employeeId" : req.body.employeeId },{$set :{    
                "employeeName" : req.body.employeeName,
                "employeeId" : req.body.employeeId,
                "employeeContact" : req.body.employeeContact ,
                "employeeSalary" : req.body.employeeSalary,
                "employeeProjectId" : req.body.employeeProjectId
            }}) 
            .then( response => {
                res.json({
                    message : "Employee data has been Updated"
                })
            })

        }
        updateEmployee()
        .catch(err => {
            res.json({
                message : "Error while Updating Employee Data"
            })
        })
    })
    .delete(authenticate.verifyUser , (req,res) => {
 
        async function deleteEmployee(){

            await details_employee.deleteOne({"employeeId" : req.params.id})
            .then( 
                res.json({
                    message : "Employee data has been deleted"
                })
            )
        }
        deleteEmployee()
        .catch(err => {
            res.json({
                message : "Error while Deleting Employee Data"
            })
        })
    })



module.exports = router;