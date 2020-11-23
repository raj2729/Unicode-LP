const express=require("express")
const mongoose = require("mongoose")
const router=express.Router()
const passport = require('passport');
const bodyparser = require("body-parser")
const passportLocalMongoose = require('passport-local-mongoose');
const authenticate = require("../authenticate")
 
router.use(bodyparser.json())

//Setting up a collection of CUSTOMER
let details_customer = require("../models/customer")

// router.use(function (req,res,next){
//     console.log("Customer Request handled");
//     next()
// })

//Managing the routes
router
    .route("/")
    .post(authenticate.verifyUser , async (req,res,next) => {
        let customerData = new details_customer(req.body)

        try{

            await customerData.save()
            res.status(200).send("Customer Details have been added");

        }
        catch(err){
            res.status(400)
            res.send("Details of Customer have not been added")
        }    
    })
    .get( async (req,res,next) => {
  
        try{

            let response = await details_customer.find()
            res.send(response);

        }
        catch(err){
           res.send("Error while loading Customer Data")
        }
    })

router 
    .route("/:id")
    .get(authenticate.verifyUser , async (req,res,next) => {

        try{
            // await details_customer.find({"customerId" : req.params.id})
            let response = await details_customer.findById(req.params.id)
            
            res.send(response);
        }
        catch(err) {
            res.send("Error while loading Customer Data");
        }
    })
    .put(authenticate.verifyUser , async (req,res,next) => {

        try{
  
            await details_customer.findOneAndUpdate(req.params.customerId ,{$set :req.body} , {new : true}) 
            res.status(200).send("Customer data has been Updated Successfully")
            
        }
        catch(err) {
            res.send("Error while Updating Customer Data");
        }
    })
    .delete(authenticate.verifyUser , authenticate.verifyAdmin ,async (req,res,next) => {
 
        try{

            await details_customer.findOneAndDelete({"customerId" : req.params.id})
            res.send("Customer data has been Deleted Successfully")
            
        }
        catch(err){
            res.send("Error while Deleting Customer Data");
        }
    })

module.exports = router;