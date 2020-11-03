const mongoose = require('mongoose')
const bodyparser = require("body-parser")
const express=require("express")
const path =require("path")
const passportLocalMongoose = require('passport-local-mongoose');

let Schema = mongoose.Schema
                
//Defining EMPLOYEE mongoose schema
let employeeSchema = new Schema({
    employeeName :{
        type :String,
        require :true,
    },
    employeeId : {
        type : Number,
        require : true,
    },
    employeeContact : {
        type : Number,
        require : true,
    },
    employeeSalary : {
        type : Number,
        require : true,
    },
    employeeProjectId : {
        type : Number,
    }

} , {
    timestamps: true
} )

employeeSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model("details_employee" , employeeSchema );