const chai = require('chai')
const chaiHttp = require('chai-http');
const assert = chai.assert
const app = require('../app')

chai.use(chaiHttp);

describe("GET request to /users/saved-posts/userId=:userId&postId=:postId route", () => {
    it("it should respond with an HTTP 200 status code and the user who saved the post", done => {   
        chai
          .request(app)
          .get("/users/saved-posts/userId=6369ac2814b5d4cb75cec8e7&postId=6369b8b39020da2afc9a002d")
          .end((err, res) => {
            assert.equal(res.status, 200) // correct status 200
            assert.equal(res.body[0]._id,"6369ac2814b5d4cb75cec8e7") // return the user with the corresponding user id
            done() // resolve the Promise that these tests create so mocha can move on
          })
    })
})

describe("GET request to /users/saved-posts/userId=:userId&postId=:postId route", () => {
    it("it should respond with an HTTP 200 status code and an empty array (invalid postId)", done => {   
        chai
          .request(app)
          .get("/users/saved-posts/userId=6369ac2814b5d4cb75cec8e7&postId=random-invalid-id")
          .end((err, res) => {
            assert.equal(res.status, 200) // correct status 200
            assert.equal(res.body.length,0) // the length of the array is 0 as the o
            done() // resolve the Promise that these tests create so mocha can move on
          })
    })
})

describe("POST request to /users/saved-posts route", () => {
    it("it should respond with an HTTP 200 status code and the updated info about the user", done => {
        let data = {
            "userId": "6369abfa14b5d4cb75cec8e2",
            "postId": "636bf7f026bbc2f1ebdb0bb2"
        }
        chai
          .request(app)
          .post("/users/saved-posts")
          .send(data)
          .end((err, res) => {
            assert.equal(res.status, 200) // use should to make BDD-style assertions
            assert.equal(res.body.savedPosts[0],"636bf7f026bbc2f1ebdb0bb2") // check the post id is updated
            assert.equal(res.body._id,"6369abfa14b5d4cb75cec8e2")
            done() // resolve the Promise that these tests create so mocha can move on
          })
    })
})

describe("POST request to /users/saved-posts route", () => {
    it("it should respond with an HTTP 200 status code and an object with a field MESSAGE that the userId is invalid" , done => {
        let data = {
            "userId": "invalid user id",
            "postId": "636bf7f026bbc2f1ebdb0bb2"
        }
        chai
          .request(app)
          .post("/users/saved-posts")
          .send(data)
          .end((err, res) => {
            assert.equal(res.status, 200) // use should to make BDD-style assertions
            assert.exists(res.body.message) // check the post id is updated
            done() // resolve the Promise that these tests create so mocha can move on
          })
    })
})


describe("DELETE request to /users/saved-posts/userId=:userId&postId=:postId route", () => {
    it("it should respond with an HTTP 200 status code and confirm the update", done => {
        chai
          .request(app)
          .delete(`/users/saved-posts/userId=6369abfa14b5d4cb75cec8e2&postId=636bf7f026bbc2f1ebdb0bb2`)
          .end((err, res) => {
            assert.equal(res.status, 200)
            assert.equal(res.body.modifiedCount, 1) // our route sends back an object with modifiedCount:1
            done() // resolve the Promise that these tests create so mocha can move on
          })
    })
})

describe("DELETE request to /users/saved-posts/userId=:userId&postId=:postId route", () => {
    it("it should respond with an HTTP 200 status code and confirm the nothing is modified", done => {
        chai
          .request(app)
          .delete(`/users/saved-posts/userId=6369abfa14b5d4cb75cec8e2&postId=636bf7f026bbc2f1ebdb0bb2`)
          .end((err, res) => {
            assert.equal(res.status, 200)
            assert.equal(res.body.modifiedCount, 0) // our route sends back an object with modifiedCount:0
            done() // resolve the Promise that these tests create so mocha can move on
          })
    })
})

describe("DELETE request to /users/saved-posts/userId=:userId&postId=:postId route", () => {
    it("it should respond with an HTTP 200 status code and a message that the user id is invalid", done => {
        chai
          .request(app)
          .delete(`/users/saved-posts/userId=invalid-user-id&postId=636bf7f026bbc2f1ebdb0bb2`)
          .end((err, res) => {
            assert.equal(res.status, 200)
            assert.exists(res.body.message) // our route sends back an object with modifiedCount:0
            done() // resolve the Promise that these tests create so mocha can move on
          })
    })
})