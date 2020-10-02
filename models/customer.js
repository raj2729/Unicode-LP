const mongoose = require('mongoose')
const bodyparser = require("body-parser")
const express=require("express")
const path =require("path")
const passportLocalMongoose = require('passport-local-mongoose');

let Schema = mongoose.Schema
               
//Defining CUSTOMER mongoose schema
let customerSchema = new Schema({
    customerName : String,
    customerProjects : String,
    customerId : Number    
} , {
    timestamps: true
})

customerSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("details_customer" , customerSchema );