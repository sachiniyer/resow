const chai = require('chai')
const assert = require('chai').assert
const chaiHttp = require('chai-http');
const app = require('../app')


chai.use(chaiHttp);

let newUserId

describe("GET request to /users route", () => {
  it("it should respond with an HTTP 200 status code and an object in the response body", done => {   
      chai
        .request(app)
        .get("/users")
        .end((err, res) => {
          assert.equal(res.status, 200) // use should to make BDD-style assertions
          assert.exists(res.body[0]._id) //our route sends back an object with multiple users
          done() // resolve the Promise that these tests create so mocha can move on
        })
  })
})


/*describe('GET specific user', () => {
  it('it should GET all the user', (done) => {
    chai.request(server)
        .get('/users')
        .end((err, res) => {
              
          done();
        });
  });

});*/

describe('GET specific user (request to users/:userId route', () => {
  it('it should respond with an HTTP 200 status code and a specific user object with all its details', (done) => {
    chai.request(server)
        .get('/users/6369abfa14b5d4cb75cec8e2')
        .end((err, res) => {
          assert.equal(res.status, 200) // correct status 200
          assert.exists(res.body.fullname) // our route sends back an object with a fullname
          asssert.exists(res.body.emailID) // our route sends back an object with an emailID
          assert.exists(res.body.password) // our route sends back an object with a password
          assert.exists(res.body.phone) // our route sends back an object with a phone
          assert.exists(res.body.img) // our route sends back an object with an img
          assert.equal(res.body._id, '6369abfa14b5d4cb75cec8e2') // our route sends back an object with the correct _id
          done() // resolve the Promise that these tests create so mocha can move on
        });
  });

});


describe("POST request to post new user", () => {
  it('it should respond with a HTTP 200 status code and the new created user', (done) => {
      let user = {
          fullname: "First Last",
          emailID: "fl987@gmu.edu",
          password: "bonjour123",
          phone: 9871516251, 
          savedPost:[], 
          img:[]
      }
    chai.request(app)
        .post('/users')
        .send(user)
        .end((err, res) => {
          assert.equal(res.status, 200) // use should to make BDD-style assertions
          assert.exists(res.body.fullname) // our route sends back an object
          assert.exists(res.body._id) // our route sends back an object with an id
          newUserId = res.body._id
          done();   // resolve the Promise that these tests create so mocha can move on
        });
  });

});

/*describe('PATCH specific user', () => {
  it('??', (done) => {
    chai.request(server)
        .get('/users')
        .end((err, res) => {
              
          done();
        });
  });

});*/

/*describe('DELETE specific user', () => {
  it('??', (done) => {
    chai.request(server)
        .get('/users')
        .end((err, res) => {
              
          done();
        });
  });

});*/


