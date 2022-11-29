const chai = require('chai')
const assert = require('chai').assert
const chaiHttp = require('chai-http');
const app = require('../app')


chai.use(chaiHttp);

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

describe('GET specific user (GET request to users/:userId route)', () => {
  it('it should respond with an HTTP 200 status code and a specific user object with all its details', (done) => {
    chai.request(app)
        .get('/users/6369abfa14b5d4cb75cec8e2')
        .end((err, res) => {
          assert.equal(res.status, 200) // correct status 200
          assert.exists(res.body.fullname) // our route sends back an object with a fullname
          assert.exists(res.body.emailID) // our route sends back an object with an emailID
          assert.exists(res.body.password) // our route sends back an object with a password
          assert.exists(res.body.phone) // our route sends back an object with a phone
          assert.exists(res.body.img) // our route sends back an object with an img
          assert.equal(res.body._id, '6369abfa14b5d4cb75cec8e2') // our route sends back an object with the correct _id
          done() // resolve the Promise that these tests create so mocha can move on
        });
  });

});


describe('PATCH for specific user (PATCH request to users/:userId route)', () => {
  it('it should respond with a HTTP 200 status code and confirm that it updated the user object', (done) => {
    let changedUser  = {
        fullname: "minwu kim",
        emailID: "mwk300@nyu.edu",
        phone: 6461231235
    }   
    
    chai
      .request(app)
      .patch(`/users/637cfb2d0313ae3676b64bb0`)
      .send(changedUser)
      .end((err, res) => {
        assert.equal(res.status, 200) // correct status 200
        assert.equal(res.body.acknowledged, true) // our route sends back an object with acknowledged == true
        assert.equal(res.body.modifiedCount, 1) // our route sends back an object with modifiedCount 1
        done();
      });
  });

  it('it should have updated the user object fields', (done) => {
    chai
      .request(app)
      .get(`/users/637cfb2d0313ae3676b64bb0`)
      .end((err, res) => {
        assert.equal(res.body.fullname,"minwu kim") // our route sends back an object with the changed fullname
        assert.equal(res.body.emailID, "mwk300@nyu.edu") // our route sends back an object with the changed emailID
        assert.equal(res.body.phone, 6461231235) // our route sends back an object with the changed phone
        assert.exists(res.body.img) // our route sends back an object with an img
        done();
      })
  });

});

describe('PATCH for specific user (PATCH request to users/:userId route)', () => {
  it('it should respond with a HTTP 200 status code and confirm that it updated the user object', (done) => {
    let changedUser  = {
        fullname: "minwu kim",
        emailID: "mwk300@nyu.edu",
        phone: 6461231234
    }   
    
    chai
      .request(app)
      .patch(`/users/637cfb2d0313ae3676b64bb0`)
      .send(changedUser)
      .end((err, res) => {
        assert.equal(res.status, 200) // correct status 200
        assert.equal(res.body.acknowledged, true) // our route sends back an object with acknowledged == true
        assert.equal(res.body.modifiedCount, 1) // our route sends back an object with modifiedCount 1
        done();
      });
  });

  it('it should have updated the user object fields', (done) => {
    chai
      .request(app)
      .get(`/users/637cfb2d0313ae3676b64bb0`)
      .end((err, res) => {
        assert.equal(res.body.fullname,"minwu kim") // our route sends back an object with the changed fullname
        assert.equal(res.body.emailID, "mwk300@nyu.edu") // our route sends back an object with the changed emailID
        assert.equal(res.body.phone, 6461231234) // our route sends back an object with the changed phone
        assert.exists(res.body.img) // our route sends back an object with an img
        done();
      })
  });

});

describe('PATCH for user when you send it without a body', () => {
  it('it should respond with a HTTP 200 status code and acknowledge that it could not update the user object', (done) => {
    chai
      .request(app)
      .patch(`/users/637cfb2d0313ae3676b64bb0`)
      .end((err, res) => {
        assert.equal(res.status, 200) // correct status 200
        assert.equal(res.body.acknowledged, false) // our route sends back an object with acknowledged == false
        done();
      });
  })
});

// describe("POST request to post new user", () => {
//   it('it should respond with a HTTP 200 status code and the new created user', (done) => {
//       let user = {
//           fullname: "First Last",
//           emailID: "fl987@gmu.edu",
//           password: "bonjour123",
//           phone: 9871516251, 
//           savedPost:[], 
//           img:[]
//       }
//     chai.request(app)
//         .post('/users')
//         .send(user)
//         .end((err, res) => {
//           assert.equal(res.status, 200) // use should to make BDD-style assertions
//           assert.exists(res.body.fullname) // our route sends back an object
//           assert.exists(res.body._id) // our route sends back an object with an id
//           newUserId = res.body._id
//           done();   // resolve the Promise that these tests create so mocha can move on
//         });
//   });

// });

// describe('DELETE specific user (DELETE request to users/:userId route)', () => {
//   it('it should respond with an HTTP 200 status code and confirm the deletion update', (done) => {
//     chai.request(app)
//         .delete(`/users/${newUserId}`)
//         .end((err, res) => {
//           assert.equal(res.status, 200)
//           assert.equal(res.body.acknowledged, true) // our route sends back an object with acknowledged == true
//           done() // resolve the Promise that these tests create so mocha can move on
//         });
//   });

// });




