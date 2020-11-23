const express=require("express")
const uploadRouter=express.Router()
const bodyparser = require("body-parser")
const multer = require('multer');
const authenticate = require("../authenticate")
const fs = require('fs');
const path = require('path');

uploadRouter.use(bodyparser.json())

// uploadRouter.use(function (req,res,next){
//     console.log("Upload Request successful");
//     next();
// })

//To specify the folder to which files will be stored
let storage = multer.diskStorage({

    destination : (req,file,cb) =>{
        //file has info 
        //cb => callback
        cb(null , "uploads")//to destination folder (public folder)
    },

    filename : (req,file,cb) => {
        cb(null , file.originalname)//filename saved as original name on server side
    }

})

const upload = multer({
    storage : storage
})

uploadRouter.route("/uploadFile")
    .get(authenticate.verifyUser , (req,res,next) => {
        res.statusCode = 403;
        res.end("GET operation not allowed on /uploadFile");
    })

    .post(authenticate.verifyUser, upload.single("File") , (req,res,next) =>{
    //upload single => single file to be uploaded

        res.statusCode = 200; 
        res.setHeader("Content-Type" , "application/json");
        res.json(req.file);     

    }

    )

    .put(authenticate.verifyUser , (req,res,next) => {
        res.statusCode = 403;
        res.end("PUT operation not allowed on /uploadFile");
    })

    .delete(authenticate.verifyUser , (req,res,next) => {
        res.statusCode = 403;
        res.end("DELETE operation not allowed on /uploadFile");
    })

uploadRouter.route("/download/:filename")

    .get((req,res,next) => {
        const file=path.join(__dirname,"..",`/uploads/${req.params.filename}`)
        res.download(file ,(err) => {
            if(err){
                console.log("ERROR");
                res.send(err)
            }
        }) //To download the file go to the browser and the 
        //localhost/uploads/download/Raj.pdf
        //necessary to enter the extension name or else it will show error   
    })
 
    .post(authenticate.verifyUser , (req,res,next) => {
        res.statusCode = 403;
        res.end("POST operation not allowed on /download");
    })

    .put(authenticate.verifyUser , (req,res,next) => {
        res.statusCode = 403;
        res.end("PUT operation not allowed on /download");
    })

    .delete(authenticate.verifyUser , (req,res,next) => {
        res.statusCode = 403;
        res.end("DELETE operation not allowed on /download");
    })
    
//to view uploaded files 
uploadRouter.route("/viewFiles")
    .get(authenticate.verifyUser , (req,res,next) => {
        let dir_name = "uploads";
        let file_names = fs.readdirSync(dir_name) ;
        res.send(file_names);
    })


module.exports = uploadRouter;