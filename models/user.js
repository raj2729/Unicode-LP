const mongoose = require('mongoose')
const bodyparser = require("body-parser")
const express=require("express")
const path =require("path")
const passportLocalMongoose = require('passport-local-mongoose');


let Schema=mongoose.Schema ;
let User = new Schema({

    // username :{
    //     type : String,
    //     require : true,
    //     unique : true ,
    // },
    // password :{
    //     type : String,
    //     require : true,
    // },
    
    //No need in passport
    admin :{
        type : Boolean,
        default : false,
    }

} , { 
    timestamps: true
} )

User.plugin(passportLocalMongoose);


module.exports = mongoose.model("User" , User );