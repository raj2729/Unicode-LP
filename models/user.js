const mongoose = require('mongoose')
const bodyparser = require("body-parser")
const express=require("express")
const path =require("path")
const passportLocalMongoose = require('passport-local-mongoose');

let Schema=mongoose.Schema ;
let User = new Schema({

    name : {
        type : String,
        default : '',
    },
    username :{
        type : String,
    },
    password :{
        type : String,
    },
    admin :{
        type : Boolean
    }

} , { 
    timestamps: true
} )

User.plugin(passportLocalMongoose);


module.exports = mongoose.model("User" , User );