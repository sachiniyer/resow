const chai = require('chai')
const chaiHttp = require('chai-http');
const assert = chai.assert
const app = require('../app')

chai.use(chaiHttp);

let newPostId

describe("GET request to /posts route", () => {
    it("it should respond with an HTTP 200 status code and an object in the response body", done => {   
        chai
          .request(app)
          .get("/posts")
          .end((err, res) => {
            assert.equal(res.status, 200) // use should to make BDD-style assertions
            assert.exists(res.body[0]._id) //our route sends back an object with multiple posts
            done() // resolve the Promise that these tests create so mocha can move on
          })
    })
})

describe("GET request to /posts/:postId route", () => {
    it("it should respond with an HTTP 200 status code and a post with title and description", done => {   
        chai
          .request(app)
          .get("/posts/6369b88a9020da2afc9a002b")
          .end((err, res) => {
            assert.equal(res.status, 200) // correct status 200
            assert.exists(res.body.title) // our route sends back an object with a title
            assert.equal(res.body._id, '6369b88a9020da2afc9a002b') // our route sends back an object with the correct _id
            done() // resolve the Promise that these tests create so mocha can move on
          })
    })
})

describe("POST request to /posts route", () => {
    it("it should respond with an HTTP 200 status code and the created post", done => {
        let post = {
            title: "The Lord of the Rings",
            description: "J.R.R. Tolkien",
            timeStart: "2018-03-29T17:34:00.000Z",
            timeEnd: "2018-03-29T17:34:00.000Z",
            location: "300 West 4th St. NYC",
            owner: "6369abfa14b5d4cb75cec8e2",
            latitude: "40.93",
            longitude: "50.53",
            images: ["/resowLogo.png",
                     "/sample.png",
                     "/sample2.png"]
            
        }
        chai
          .request(app)
          .post("/posts")
          .send(post)
          .end((err, res) => {
            assert.equal(res.status, 200) // use should to make BDD-style assertions
            assert.exists(res.body.title) // our route sends back an object
            assert.exists(res.body._id) // our route sends back an object with an id
            newPostId = res.body._id
            done() // resolve the Promise that these tests create so mocha can move on
          })
    })
})

describe("DELETE request to /posts/:postId route", () => {
    it("it should respond with an HTTP 200 status code and acknowledge the deletion of the post created by the post test above", done => {
        chai
          .request(app)
          .delete(`/posts/${newPostId}`)
          .end((err, res) => {
            assert.equal(res.status, 200)
            assert.equal(res.body.acknowledged, true) // our route sends back an object with acknowledged == true
            done() // resolve the Promise that these tests create so mocha can move on
          })
    })
})