//During the test , the env variable is set to test to avoid logging with testing
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
// let details_employee = require("../models/employee")
let User = require("../models/user")

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

//To do authorisation before testing
let user = {
    username : "raj",//For logging in
    password : "password"
}

let user1 = {
    username : "sample2",//for signup
    password : "password"
}

//For admin tests
let adminUser = {//npm run test "./test/user.js"(For running only user)
    username : "admin",
    password : "password"//TO  RUN  =>  npm run test
}

let user_id="5063967031ac40094ca57224"

//Sample Test Objects
sample_username ="sample"
 
describe('User Endpoints for User', () => {

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
 
// Test the /POST SIGNUP user route

    describe('/POST SIGNUP for user', () => {
	
	    it('it should SIGNUP user', (done) => {
                       
			chai.request(app)
            .post('/users/signup')
            .send(user1)
            .end((err,res) => {
                if(err) done(err);

                res.should.have.status(200);

                done();
            });
	    });
    });


    describe('/POST LOGIN for user', () => {
	
	    it('it should LOGIN user', (done) => {
            chai.request(app)
            .post('/users/login')
            .send(user1)
            .end((err,res) => {
                if(err) done(err);
                res.should.have.status(200);

                done();
            });  
        });
    });  

    describe('/GET LOGOUT Users', () => {
	    it('it should LOGOUT the User', (done) => {

            chai.request(app)
            .get('/users/logout')
            .send(user1)
            .end((err,res) => {
                if(err) 
                    done(err);
                res.should.have.status(200);

                done();
            });

	    });
    }); 
});

describe('User Endpoints for Admin', () => {
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
   
//Test the /GET user route
  
    describe('/GET Users', () => {
	    it('it should GET details all the Users', (done) => {
            
			chai.request(app)
		    .get('/users')
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
    // Test the /DELETE/:id route
  
    describe('/DELETE/:id User', () => {
	    it('it should DELETE details of User by the given id', (done) => {
				
            
            chai.request(app)
		    .delete(`/users/${user_id}`)
            .set({ Authorization:`Bearer ${bearer_token}`})
		    .end((err, res) => {
		    	res.should.have.status(200);
			    res.body.should.be.a('object');
		    	done();
		    }); 
		});
    });
});