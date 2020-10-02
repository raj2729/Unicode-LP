const mongoose = require('mongoose')
const bodyparser = require("body-parser")
const express=require("express")
const path =require("path")
const passportLocalMongoose = require('passport-local-mongoose');

let Schema = mongoose.Schema
               
//Defining EMPLOYEE mongoose schema
let employeeSchema = new Schema({
    employeeName : String,
    employeeId : Number,
    employeeContact : Number,
    employeeSalary : Number,
    employeeProjectId : Number,

} , {
    timestamps: true
} )

employeeSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model("details_employee" , employeeSchema );