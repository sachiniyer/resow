const chai = require('chai')
const chaiHttp = require('chai-http');
const assert = chai.assert
const app = require('../app')
const Post = require('../models/Post')
const User = require("../models/userschema")

chai.use(chaiHttp);


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
