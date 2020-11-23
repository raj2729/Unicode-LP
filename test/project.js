//During the test , the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let details_project = require("../models/project")

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

let adminUser = {//npm run test "./test/project.js"(For running only project)
    username : "admin",
    password : "password"//TO  RUN  =>  npm run test
}
// 5fa1046f9026b415480dcf18 => ID of admin account

//Sample Test Objects

let project2 = {
    "projectName": "LMNO",
    "projectCustomer": "Gaurav",
    "projectId": 66,
    "projectEmployeeId": 66,
    "projectStartDate": "12/9/19"
}

project_id1 ="50948fafc8ac840d1c838d19"

describe('PROJECTS Endpoints for User', () => {

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
 
//Test the /GET project route
  
  describe('/GET Project', () => {
	  it('it should GET details of all the projects', (done) => {
			chai.request(app)
		    .get('/projects')
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
 
// Test the /POST project route

    describe('/POST Project', () => {
	
	  it('it should POST details of Project', (done) => {
            var user1 = {
                "projectName": "Corona",
                "projectCustomer": "Dhruvi",
                "projectId": 99,
                "projectEmployeeId": 99,
                "projectStartDate": "8/6/18"
            }
			chai.request(app)
		    .post('/projects')
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

  describe('/GET/:id Project', () => {
	  it('it should GET details of project by the given id', (done) => {
	  	chai.request(app)
		.get(`/projects/${project_id1}`)
        .set({ Authorization:`Bearer ${bearer_token}`})
		.end((err, res) => {
            if(err) 
                done(err);
			res.should.have.status(200);
			res.body.should.be.a('object');
		    done();
		});
			
	  });
  });

// Test the /PUT/:id route
  
    describe('/PUT/:id Project', () => {
	    it('it should UPDATE details of project by the given id', (done) => {
	  	
	        chai.request(app)
		    .put('/projects/' + project_id1)
            .set({ Authorization:`Bearer ${bearer_token}`})
		    .send(project2)
		    .end((err, res) => {
                if(err) 
                    done(err);
		        res.should.have.status(200);
			    res.body.should.be.a('object');
			    done();
		    });
		  
	    });
    });
});

describe('PROJECTS Delete Endpoint for Admin', () => {

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
  
    describe('/DELETE/:id Project', () => {
	    it('it should DELETE details of project by the given id', (done) => {
				
            chai.request(app)
		    .delete('/projects/' + project_id1)
            .set({ Authorization:`Bearer ${bearer_token}`})
		    .end((err, res) => {
		    	res.should.have.status(200);
			    res.body.should.be.a('object');
		    	done();
		    });
        });
    });

});
  