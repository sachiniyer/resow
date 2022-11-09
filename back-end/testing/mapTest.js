const chai = require('chai')
const chaiHttp = require('chai-http');
const assert = chai.assert
const app = require('../app')
const Post = require('../models/Post')

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
        longitude: 5
      }
    };
  });
  it("it should respond with an HTTP 200 status code and an object in the response body", done => {
    chai
      .request(app)
      .get("/map")
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.exists(res.body.toString(), {
          imgList: 1,
          profileURL: 2,
          title: 3,
          location: "[ 4, 5 ]"
        }.toString())
        done()
      })
  })
})
