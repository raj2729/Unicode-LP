const mongoose = require('mongoose')
const bodyparser = require("body-parser")
const express=require("express")
const path =require("path")
const passportLocalMongoose = require('passport-local-mongoose');

let Schema = mongoose.Schema

// Defining Project mongoose schema
let projectSchema = new Schema({
    projectName : String,
    projectCustomer : String,
    projectId : Number,
    projectEmployeeId : Number,
    projectStartDate : String,
})

projectSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("details_project" , projectSchema );