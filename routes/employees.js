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

// router.use(function (req,res,next){
//     console.log("Employee Request handled");
//     next()
// })

//Managing the routes
router
    .route("/")
 
    .post(authenticate.verifyUser , async (req,res,next) => {
        let employeeData = new details_employee(req.body)
        // let employeeData = new details_employee(req.body)

        try{

            await employeeData.save()
            res.status(200).send("Employee Details have been added");

        }
        catch(err) {
            res.status(400)
            // res.json({
            //     message : "Details of Employee has not been added"
            // })
            res.send("Details of Employee has not been added")
        }  
    })
    
    .get(async (req,res,next) => {
  
        try{

            let response =  await details_employee.find()
            res.send(response);

        }
        catch(err) {

            res.send("Error while loading Employee Data")
            
        }
    })
 
router 
    .route("/:id")
    .get(authenticate.verifyUser , async (req,res,next) => {

       try{
            // await details_employee.find({"employeeId" : req.params.id})
            let response = await details_employee.findById(req.params.id)
            res.send(response);
            
        }
        catch(err){
            res.send("Error while loading Employee Data")
        }
    })
    
    .put(authenticate.verifyUser , async (req,res,next) => {
 
        try{
  
            await details_employee.findOneAndUpdate(req.params.employeeId,{ $set : req.body },{new : true });
                //new gives modified employee data
            res.statusCode = 200 ;
            // res.setHeader("Content-Type","application/json");
            // res.json(emp);
            res.send("Employee Data has been updated successfully")           
 
        }
        catch(err ) {
            res.send("Error while Updating Employee Data")
            
        }
    })
 

    .delete(authenticate.verifyUser , authenticate.verifyAdmin ,async (req , res ,next ) => {
 
        try{

            await details_employee.findOneAndDelete({"_id" : req.params.id})
             
            res.send("Employee Data has been deleted successfully")
            
        }
        catch(err) {
            res.send("Error while deleteing Employee Data")
        }
    })

module.exports = router;