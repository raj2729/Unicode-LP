const mongoose = require('mongoose')
const bodyparser = require("body-parser")
const express=require("express")
const path =require("path")
const passportLocalMongoose = require('passport-local-mongoose');

let Schema = mongoose.Schema
 
// Defining Project mongoose schema
let projectSchema = new Schema({
    projectName : {
        type :String,
        require :true,
    },
    projectCustomer :{
        type : String,
        require : true,
    },
    projectId : {
        type : Number,
        require : true,
        unique : true,
    },
    projectEmployeeId : {
        type : Number,
        require : true,
    },
    projectStartDate : {
        type : String,
        require : true,
    }
} , {
    timestamps: true
})

projectSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("details_project" , projectSchema );