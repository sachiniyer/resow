const chai = require('chai')
const chaiHttp = require('chai-http');
const assert = chai.assert
const app = require('../app')
const Post = require('../models/Post')
const User = require("../models/userschema")

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
          .get('/users/6389733fd0f9f0652e94a82f')
          .end((err, res) => {
            assert.equal(res.status, 200) // correct status 200
            done() // resolve the Promise that these tests create so mocha can move on
          });
    });
  
  });



  describe("GET request to /users/saved-posts/userId=:userId&postId=:postId route", () => {
    it("it should respond with an HTTP 200 status code and the user who saved the post", done => {   
        chai
          .request(app)
          .get("/users/saved-posts/userId=6389733fd0f9f0652e94a82f&postId=63897409d0f9f0652e94a834")
          .end((err, res) => {
            assert.equal(res.status, 200) // correct status 200
            assert.equal(res.body[0]._id,"6389733fd0f9f0652e94a82f") // return the user with the corresponding user id
            done() // resolve the Promise that these tests create so mocha can move on
          })
    })
})

describe("GET request to /users/saved-posts/userId=:userId&postId=:postId route", () => {
    it("it should respond with an HTTP 200 status code and an empty array (invalid postId)", done => {   
        chai
          .request(app)
          .get("/users/saved-posts/userId=6389733fd0f9f0652e94a82f&postId=random-invalid-id")
          .end((err, res) => {
            assert.equal(res.status, 200) // correct status 200
            assert.equal(res.body.length,0) // the length of the array is 0 as the o
            done() // resolve the Promise that these tests create so mocha can move on
          })
    })
})

describe("POST request to /users/saved-posts route", function () {
    it("it should respond with an HTTP 200 status code and the updated info about the user", done => {
        let data = {
            "userId": "6389733fd0f9f0652e94a82f",
            "postId": "63897721d0f9f0652e94a87c"
        }
        chai
          .request(app)
          .post("/users/saved-posts")
          .send(data)
          .end((err, res) => {
            assert.equal(res.status, 200) // use should to make BDD-style assertions
            assert.equal(res.body._id,"6389733fd0f9f0652e94a82f")
            done() // resolve the Promise that these tests create so mocha can move on
          })
    })
})

describe("POST request to /users/saved-posts route", function (){
    it("it should respond with an HTTP 200 status code and an object with a field MESSAGE that the userId is invalid" , done => {
        let data = {
            "userId": "invalid user id",
            "postId": "63897721d0f9f0652e94a87c"
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


describe("DELETE request to /users/saved-posts/userId=:userId&postId=:postId route", function () {
    it("it should respond with an HTTP 200 status code and confirm the update", done => {
        chai
          .request(app)
          .delete(`/users/saved-posts/userId=6389733fd0f9f0652e94a82f&postId=63897721d0f9f0652e94a87c`)
          .end((err, res) => {
            assert.equal(res.status, 200)
            assert.equal(res.body.modifiedCount, 1) // our route sends back an object with modifiedCount:1
            done() // resolve the Promise that these tests create so mocha can move on
          })
    })
})

describe("DELETE request to /users/saved-posts/userId=:userId&postId=:postId route", function () {
    it("it should respond with an HTTP 200 status code and confirm the nothing is modified", done => {
        chai
          .request(app)
          .delete(`/users/saved-posts/userId=6389733fd0f9f0652e94a82f&postId=63897721d0f9f0652e94a87c`)
          .end((err, res) => {
            assert.equal(res.status, 200)
            assert.equal(res.body.modifiedCount, 0) // our route sends back an object with modifiedCount:0
            done() // resolve the Promise that these tests create so mocha can move on
          })
    })
})

describe("DELETE request to /users/saved-posts/userId=:userId&postId=:postId route", function () {
    it("it should respond with an HTTP 200 status code and a message that the user id is invalid", done => {
        chai
          .request(app)
          .delete(`/users/saved-posts/userId=invalid-user-id&postId=63897721d0f9f0652e94a87c`)
          .end((err, res) => {
            assert.equal(res.status, 200)
            assert.exists(res.body.message) // our route sends back an object with modifiedCount:0
            done() // resolve the Promise that these tests create so mocha can move on
          })
    })
})

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
  
  describe("GET request to /posts/longitude=:longitude&latitude=:latitude route", () => {
    before(() => {
      Post.find = async () => { return [{ _id: 1, longitude: 2, latitude: 3 }] };
    });
  
    it("it should respond with an HTTP 200 status code and an object in the response body", done => {
      chai
        .request(app)
        .get("/posts/longitude=-80&latitude=40.01")
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

  describe('PATCH for post when you send it with an invalid post id', () => {
  it('it should respond with a HTTP 200 status code and acknowledge that it could not update the user object', (done) => {
    chai
      .request(app)
      .patch(`/posts/invalidpostid`)
      .end((err, res) => {
        assert.equal(res.status, 200) // correct status 200
        done();
      });
  })
});

describe("DELETE request to /posts/:postId route with invalid post id", () => {
  it("it should respond with an HTTP 200 status code", done => {
    chai
      .request(app)
      .delete(`/posts/invalidpostid`)
      .end((err, res) => {
        assert.equal(res.status, 200)
        done() // resolve the Promise that these tests create so mocha can move on
      })
  })
})


  describe("GET request to /map route", () => {
    before(() => {
      Post.find = async () => { return [{ id: 1, longitude: 2, latitude: 3 }] };
    });
    it("it should respond with an HTTP 200 status code and an object in the response body", done => {
      chai
        .request(app)
        .get("/map")
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.equal(res.body.toString(), {
            type: "FeatureCollection",
            features: [{
              type: "Feature",
              id: 1,
              geometry: {
                type: "Point",
                coordinates: [2, 3]
              }
            }]
          }.toString())
          done()
        })
    })
  })
  
  describe("GET request to /map/features route", () => {
    before(() => {
      Post.findById = async () => {
        return {
          images: 1,
          profileURL: 2,
          title: 3,
          latitude: 4,
          longitude: 5,
          owner: 6
        }
      };
      User.findById = async () => {
        return {
          img: [7],
          fullname: 8
        }
      };
    });
    it("it should respond with an HTTP 200 status code and an object in the response body", done => {
      chai
        .request(app)
        .get("/map/feature")
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.exists(res.body.toString(), {
            sellerName: 8,
            profile: [7],
            imgList: 1,
            profileURL: 2,
            title: 3,
            location: "[ 4, 5 ]",
          }.toString())
          done()
        })
    })
  })
  
  
  describe("GET request to /map route that fails", () => {
    before(() => {
      Post.find = async () => { return [{ id: 1, }] };
    });
    it("it should respond with an HTTP 500 status code and an object in the response body", done => {
      chai
        .request(app)
        .get("/map")
        .end((err, res) => {
          assert.equal(res.status, 500)
          done()
        })
    })
  })
  
  
  describe("GET request to /map/features route that fails because of Post", () => {
    before(() => {
      Post.findById = async () => { return { id: 1, } };
    });
    it("it should respond with an HTTP 500 status code and an object in the response body", done => {
      chai
        .request(app)
        .get("/map/feature")
        .end((err, res) => {
          assert.equal(res.status, 500)
          done()
        })
    })
  })
  
  
  describe("GET request to /map/features route that fails because of User", () => {
    before(() => {
      Post.findById = async () => {
        return {
          images: 1,
          profileURL: 2,
          title: 3,
          latitude: 4,
          longitude: 5,
          owner: 6
        }
      };
      User.findById = async () => {
        return {
          img: [7],
        }
      };
    });
    it("it should respond with an HTTP 500 status code and an object in the response body", done => {
      chai
        .request(app)
        .get("/map/feature")
        .end((err, res) => {
          assert.equal(res.status, 500)
          done()
        })
    })
  })
  