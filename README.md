# Project Management System
Tasks for Unicode learning period

## Project Structure

```
.
├── config/                 -> Contains secret key for queries
├── models/                 -> Contains database models
├── routes/                 -> Files exporting respective routers for endpoints
├── app.js                  -> Main File
└── package.json            -> Npm package.json file
```
## Usage
```
node app.js
```
## Endpoints
All root endpoints have their separate router in `./router` folder

|Endpoints              |Description                                                                    |Methods               |
|-----------------------|-------------------------------------------------------------------------------|----------------------|
|/                      |Home Page(Just have added a random view of form)                                                                    |GET                   |
|/users                 | Displays List Of Users                                                        |GET                   |
|/users/signup          |Sign Up page for a user                                                        |POST                 |
|/users/login           |Login of a user                                                                |POST                  |
|/users/logout          |User logout                                                                    |POST                  |
|/users/delete/:username|Delete a user from database                                                    |DELETE               |
|/employees             |List of all emplloyees and add new employee                                    |GET , POST           |
|/employees/:id         |Details of specified employee                                                  |GET, PUT, DELETE     |
|/projects              |List of all projects                                                           |GET, POST             |
|/projects/:id          |Details of specified project                                                   |GET, PUT, DELETE      |
|/customers             |List of all customers                                                          |GET, POST, DELETE     |
|/customers/:id         |Details of specified customer                                                  |GET, PUT, DELETE      |

The get request for the user is to check if the user is authenticated or not. All the routesthen i.e to the employees, projects and customers require authentication for  POST to add ,PUT , DELETE and GET a specific employee,project,customer                   

# Testing
## User Sign Up

<img src="screenshots/User/usersignup.jpg">

## User Login

<img src="screenshots/User/userlogin.jpg">

## User Logout
(Redirects to home page which is a Student Form)

<img src="screenshots/User/userlogout.jpg">

## Only after logging in and including the token as Bearer token in Authorization headers , the user will be able to GET,POST,PUT or DELETE .

# Employee

## Get all Employee details

<img src="screenshots/employee/empdetails.jpg">

## Add an Employee detail

<img src="screenshots/employee/addemp.jpg">

## Get an Employee detail by id

<img src="screenshots/employee/getempbyid.jpg">

## Update an Employee detail by id

<img src="screenshots/employee/updateemp.jpg">

## Delete an Employee detail by id

<img src="screenshots/employee/deleteemp.jpg">

# Project

## Get all Project details

<img src="screenshots/employee/empdetails.jpg">

## Add an Project detail

<img src="screenshots/employee/addemp.jpg">

## Get an Project detail by id

<img src="screenshots/employee/getempbyid.jpg">

## Update an Project detail by id

<img src="screenshots/employee/updateemp.jpg">

## Delete an Project detail by id

<img src="screenshots/employee/deleteemp.jpg">

# Customer

## Get all Customer details

<img src="screenshots/employee/empdetails.jpg">

## Add an Customer detail

<img src="screenshots/employee/addemp.jpg">

## Get an Customer detail by id

<img src="screenshots/employee/getempbyid.jpg">

## Update an Customer detail by id

<img src="screenshots/employee/updateemp.jpg">

## Delete an Customer detail by id

<img src="screenshots/employee/deleteemp.jpg">

# Testing

## Testing Employee endpoint

<img src="screenshots/employee/employee_test.jpg">

## Testing Project endpoint

<img src="screenshots/project/project_test.jpg">

## Testing Customer endpoint

<img src="screenshots/customer/customer_test.jpg">
