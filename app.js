const mongoose = require('mongoose')
const express=require("express")
const path =require("path")
const bodyparser = require("body-parser")
const cookieParser = require('cookie-parser');
const passport = require('passport');

const authenticate = require("./authenticate")
const config = require('./config');

const session = require('express-session');
const FileStore = require("session-file-store")(session);

const port = 80

const employee = require("./routes/employees")
const project = require("./routes/projects")
const customer = require("./routes/customers")
const users = require("./routes/users")

app = express()
  
app.use(express.json())
app.use(bodyparser.urlencoded({extended : true}))

app.use(passport.initialize())

app.get("/" , (req,res) => {
             
    res.render("task3studentForm.pug")
})
app.use("/users",users);

// //Setting up mongoose
mongoose.connect("mongodb://localhost/ProjectManagement", {useNewUrlParser : true , useUnifiedTopology: true })


app.use("/employees" , employee)//when employee is there refer to employee file use employee.js to handle endpoints
app.use("/projects" , project)
app.use("/customers" , customer)

//START THE SERVER
app.listen(port , ()=> {
    console.log("We are connected");
})
