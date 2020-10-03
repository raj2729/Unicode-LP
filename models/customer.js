const mongoose = require('mongoose')
const bodyparser = require("body-parser")
const express=require("express")
const path =require("path")
const passportLocalMongoose = require('passport-local-mongoose');

let Schema = mongoose.Schema
                
//Defining CUSTOMER mongoose schema
let customerSchema = new Schema({
    customerName :{
        type :String,
        require :true,
    },
    customerProjects :{
        type :String,
    },
    customerId : {
        type : Number,
        require : true,
        unique : true,
    }   
} , {
    timestamps: true
})

customerSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("details_customer" , customerSchema );