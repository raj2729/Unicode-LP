//During the test , the env variable is set to test to avoid logging with testing
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let details_employee = require("../models/employee")

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

//To do authorisation before testing
let user = {
    username : "raj",
    password : "password"
}

let adminUser = {//npm run test "./test/employee.js"(For running only employee)
    username : "admin",
    password : "password"//TO  RUN  =>  npm run test
}
// 5fa1046f9026b415480dcf18 => ID of admin account


//Sample Test Objects
let employee1 = new details_employee({
    "employeeName": "Raj",
    "employeeContact": 123456789,
    "employeeSalary": 100,
    "employeeProjectId": 1    
})

let employee2 = {
    "employeeName": "Bhargav",
    "employeeId": 88,
    "employeeContact": 88,
    "employeeSalary": 88,
    "employeeProjectId": 88
}

employee_id1 ="506362a4734bb215e41c22f5"
 
describe('EMPLOYEES Endpoints for User', () => {

	before((done) => { //Before each test we check for authorization

        chai.request(app)
        .post('/users/login')
        .send(user)
        .end((err,res) => {
            if(err) done(err);
            bearer_token = res.body.token;
            // console.log(bearer_token);

            done();
        });
    });
 
//Test the /GET employee route
  
    describe('/GET employee', () => {
	    it('it should GET details all the employees', (done) => {
            
			chai.request(app)
		    .get('/employees')
            .set({ Authorization:`Bearer ${bearer_token}`})
		    .end((err, res) => {
                if(err) 
                    done(err);
			  	res.should.have.status(200);
			  	res.body.should.be.a('array');
		      done();
		    });
	  });
  }); 
 
// Test the /POST employee route

    describe('/POST employee', () => {
	
	  it('it should POST details of Employee', (done) => {
            var user1 = {
                "employeeName": "Harsh",
                "employeeId": 77,
                "employeeContact": 77,
                "employeeSalary": 77,
                "employeeProjectId": 77
            }
            
			chai.request(app)
		    .post('/employees')
            .set({ Authorization:`Bearer ${bearer_token}`})	
            .send(user1)
		    .end((err, res) => {
                if(err) 
                    done(err);
                console.log(res.statusCode);
                
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
		      done();
		    });
	  });
  });
 
//Test the /GET/:id route

    describe('/GET/:id Employee', () => {
	    it('it should GET details of employee by the given id', (done) => {
               
	  	    chai.request(app)
		    .get(`/employees/${employee_id1}`)
            .set({ Authorization:`Bearer ${bearer_token}`})
		    .end((err, res) => {
                if(err) 
                    done(err);
			    res.should.have.status(200);
			    res.body.should.be.a('object');
			    // res.body.should.have.property('employeeName');
			    // res.body.should.have.property('employeeId');
			    // res.body.should.have.property('employeeContact');
			    // res.body.should.have.property('employeeSalary');
		        done();
		    });
			
	    });
    });

// Test the /PUT/:id route
  
    describe('/PUT/:id Employee', () => {
	    it('it should UPDATE details of employee by the given id', (done) => {
	  	
        chai.request(app)
		.put('/employees/' + employee_id1)
        .set({ Authorization:`Bearer ${bearer_token}`})
		.send(employee2)
		.end((err, res) => {
            if(err) 
                done(err);
		    res.should.have.status(200);
			res.body.should.be.a('object');
            // res.body.should.have.property('employeeName');
			// res.body.should.have.property('employeeId');
			// res.body.should.have.property('employeeContact');
			// res.body.should.have.property('employeeSalary');
			// res.body.should.have.property('_id').eql(employee_id1);
			done();
		});
		  
	  });
  });
 
// // Test the /DELETE/:id route
  
//     describe('/DELETE/:id Employee', () => {
// 	    it('it should DELETE details of employee by the given id', (done) => {
				

//             chai.request(app)
//             .post('/users/login')
//             .send(adminUser)
//             .end((err,res) => {
//                 if(err) done(err);
//                 bearer_token = res.body.token;
//                 // console.log(bearer_token);

//                 // done();
//             });
//             chai.request(app)
            
// 		    .delete('/employees/' + employee_id1)
            
//             .set({ Authorization:`Bearer ${bearer_token}`})
// 		    .end((err, res) => {
// 		    	res.should.have.status(200);
// 			res.body.should.be.a('object');
// 		    	done();
// 		    }); 
// 		});
//     });

});
  

describe('EMPLOYEES Delete Endpoint for Admin', () => {

	before((done) => { //Before each test we check for authorization

        chai.request(app)
        .post('/users/login')
        .send(adminUser)
        .end((err,res) => {
            if(err) done(err);
            bearer_token = res.body.token;
            // console.log(bearer_token);

            done();
        });
    });
    // Test the /DELETE/:id route
  
    describe('/DELETE/:id Employee', () => {
	    it('it should DELETE details of employee by the given id', (done) => {
				

            chai.request(app)
            
		    .delete('/employees/' + employee_id1)
            
            .set({ Authorization:`Bearer ${bearer_token}`})
		    .end((err, res) => {
		    	res.should.have.status(200);
			res.body.should.be.a('object');
		    	done();
		    }); 
		});
    });
});