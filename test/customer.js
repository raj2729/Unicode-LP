//During the test , the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let details_customer = require("../models/customer")

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

//Sample Test Objects

let customer2 = {
    "customerName": "Devansh",
    "customerProjects": "XYZW",
    "customerId": 66
}

customer_id1 ="50949ae07207290dd44e3bd9"

describe('CUSTOMER', () => {

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
 
//Test the /GET Customer route
  
  describe('/GET Customer', () => {
	  it('it should GET details all the customers', (done) => {
			chai.request(app)
		    .get('/customers')
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
 
// Test the /POST customer route

    describe('/POST Customer', () => {
	
	  it('it should POST details of Customer', (done) => {
            var user1 = {
                "customerName": "Jatin",
                "customerProjects": "LMNO",
                "customerId": 88
            }
			chai.request(app)
		    .post('/customers')
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

  describe('/GET/:id Customer', () => {
	  it('it should GET details of customer by the given id', (done) => {
	  	chai.request(app)
		.get(`/customers/${customer_id1}`)
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
  
    describe('/PUT/:id Customer', () => {
	    it('it should UPDATE details of customer by the given id', (done) => {
	  	
	    chai.request(app)
		.put(`/customers/${customer_id1}`)
        .set({ Authorization:`Bearer ${bearer_token}`})
		.send(customer2)
		.end((err, res) => {
            if(err) 
                done(err);
		    res.should.have.status(200);
			res.body.should.be.a('object');
			done();
		});
		  
	  });
  });
 
// Test the /DELETE/:id route
  
    describe('/DELETE/:id Customer', () => {
	    it('it should DELETE details of customer by the given id', (done) => {
				
            chai.request(app)
		    .delete('/customers/' + customer_id1)
            .set({ Authorization:`Bearer ${bearer_token}`})
		    .end((err, res) => {
		    	res.should.have.status(200);
			    res.body.should.be.a('object');
		    	done();
		    });
		});
    });

});
  