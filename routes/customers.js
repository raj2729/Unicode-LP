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

router.use(function (req,res,next){
    console.log("Customer Request handled");
    next()
})

//Managing the routes
router
    .route("/")
    .post(authenticate.verifyUser , (req,res) => {
        let customerData = new details_customer(req.body)

        async function createCustomer(){

            await customerData.save()
            await (res.status(200).send("Customer Details have been added"));

        }
        createCustomer()
        .catch(err => {
            res.status(400)
            res.send("Details of Customer have been added")
        })    
    })
    .get((req,res) => {
  
        async function getCustomer(){

            await details_customer.find()
            .then (response =>{
                res.send(response);
            })

        }
        getCustomer()
        .catch(err => {
           res.send("Error while loading Customer Data")
        })
    })

router 
    .route("/:id")
    .get(authenticate.verifyUser , (req,res) => {

        async function getCustomerById(){
            // await details_customer.find({"customerId" : req.params.id})
            await details_customer.findById(req.params.id)
            
            .then(response =>{
                res.send(response);
            })
        }

        getCustomerById()
        .catch(err => {
            res.send("Error while loading Customer Data");
        })
    })
    .put(authenticate.verifyUser , (req,res) => {

        async function updateCustomer(){
  
            await details_customer.updateOne({"customerId" : req.body.customerId },{$set :{    
                "customerName" : req.body.customerName,
                "customerProjects" : req.body.customerProjects,
                "customerId" : req.body.customerId,
            }}) 
            .then( response => {
                res.send("Customer data has been Updated Successfully")
            })

        }
        updateCustomer()
        .catch(err => {
            res.send("Error while Updating Customer Data");
        })
    })
    .delete(authenticate.verifyUser , (req,res) => {
 
        async function deleteCustomer(){

            await details_customer.deleteOne({"customerId" : req.params.id})
            .then( 
                res.send("Customer data has been Deleted Successfully")
            )
        }
        deleteCustomer()
        .catch(err => {
            res.send("Error while Deleting Customer Data");
        })
    })

module.exports = router;