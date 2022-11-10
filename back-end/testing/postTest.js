const chai = require('chai')
const chaiHttp = require('chai-http');
const assert = chai.assert
const app = require('../app')
const Post = require('../models/Post')

chai.use(chaiHttp);

let newPostId

describe("GET request to /posts route", () => {
  before(() => {
    Post.find = async () => { return [{ _id: 1, longitude: 2, latitude: 3 }] };
  });

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
  before(() => {
    Post.findById = async (_) => {
      return {
        title: 1,
        _id: 2
      }
    }
  });

  it("it should respond with an HTTP 200 status code and a post with title and description", done => {
    chai
      .request(app)
      .get("/posts/6369b88a9020da2afc9a002b")
      .end((err, res) => {
        assert.equal(res.status, 200) // correct status 200
        assert.exists(res.body.title) // our route sends back an object with a title
        assert.equal(res.body._id, 2) // our route sends back an object with the correct _id
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

describe("PATCH request to /posts/:postId route", () => {
  it("it should respond with an HTTP 200 status code and confirm that it updated the post", done => {
    let changedPost = {
      title: "The Chronicles of Narnia",
      description: "C.S. Lewis",
      timeEnd: "2018-04-29T17:34:00.000Z",
      latitude: "50.93",
      images: ["/resowLogo.png",
        "/sample.png"]
      }
    chai
      .request(app)
      .patch(`/posts/${newPostId}`)
      .send(changedPost)
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.equal(res.body.acknowledged, true) // our route sends back an object with acknowledged == true
        assert.equal(res.body.modifiedCount, 1) // our route sends back an object with modifiedCount 1
        done() // resolve the Promise that these tests create so mocha can move on
      })
  })

  it('it should have updated the post object fields', (done) => {
    chai
      .request(app)
      .get(`/posts/${newPostId}`)
      .end((err, res) => {
        assert.equal(res.body.title, "The Chronicles of Narnia") // our route sends back an object with the changed title
        assert.equal(res.body.description, "C.S. Lewis") // our route sends back an object with the changed description
        assert.equal(res.body.timeEnd, "2018-04-29T17:34:00.000Z") // our route sends back an object with the changed timeEnd
        assert.equal(res.body.latitude, "50.93") // our route sends back an object with the changed phone
        assert.equal(res.body.images, ["/resowLogo.png", "/sample.png"]) // our route sends back an object with the changed images
        assert.exists(res.body.timeStart) // our route sends back an object with a timeStart
        assert.equal(res.body._id, `${newPostId}`) // our route sends back an object with the correct _id   
        done();
      })
  })

})

describe('PATCH for post when you send it without a body', () => {
  it('it should respond with a HTTP 200 status code and acknowledge that it could not update the user object', (done) => {
    chai
      .request(app)
      .patch(`/posts/${newPostId}`)
      .end((err, res) => {
        assert.equal(res.status, 200) // correct status 200
        assert.equal(res.body.acknowledged, false) // our route sends back an object with acknowledged == false
        done();
      });
  })
});

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


