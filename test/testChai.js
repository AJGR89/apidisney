//Require the dev-dependencies
import chai from "chai";
import chaiHttp from "chai-http";
import { expect,assert } from "chai";
import { PORT } from "../src/config";
import app from "../src/app";

chai.use(chaiHttp);

const url = `http://localhost:${PORT}`;

let token;

describe("Main suite", () => {
  describe("Register endpoints: ", () => {
    it("[L1] I try to login", (done) => {
      chai
        .request(url)
        .post("/auth/login")
        .send({ email: "ajgr89@gmail.com", password: "111111" })
        .end(function (err, res) {
          console.log(res.body);
          expect(res).to.have.status(200);
          done();
        });
    });
    it("[L2] I try to log in and verify token is response", (done) => {
      chai
        .request(url)
        .post("/auth/login")
        .send({ email: "ajgr89@gmail.com", password: "111111" })
        .end(function (err, res) {
          console.log(res.body);
          assert.exists(res.body.token)
          token = res.body.token;
          done();
        });
    })

    it("[L3] I try to log in with worng credentials", (done) => {
      chai
        .request(url)
        .post("/auth/login")
        .send({ email: "ajgr89@gmail.com", password: "1111s11" })
        .end(function (err, res) {
          console.log(res.body);
          expect(res).to.have.status(401);
          done();
        });
    });

    it("[R1] I try to register new user", (done) => {
      chai
        .request(url)
        .post("/auth/register")
        .send({ username: "louis", email: "c@c.com", password: "111111" })
        .end(function (err, res) {
          console.log(res.body);
          expect(res).to.have.status(200);
          done();
        });
    });
    it("[R2] I try to register existing user", (done) => {
      chai
        .request(url)
        .post("/auth/register")
        .send({ username: "louis", email: "c@c.com", password: "111111" })
        .end(function (err, res) {
          console.log(res.body);
          expect(res).to.have.status(400);
          done();
        });
    });
    it("[R3] I try to register sending empty name field", (done) => {
      chai
        .request(url)
        .post("/auth/register")
        .send({ username: " ", email: "d@d.com", password: "111111" })
        .end(function (err, res) {
          console.log(res.body);
          expect(res).to.have.status(500);
          done();
        });
    });
    it("[R4] I try to register sending empty email field", (done) => {
      chai
        .request(url)
        .post("/auth/register")
        .send({ username: "misha", email: "", password: "111111" })
        .end(function (err, res) {
          console.log(res.body);
          expect(res).to.have.status(500);
          done();
        });
    });
    it("[R5] I try to register sending empty password field", (done) => {
      chai
        .request(url)
        .post("/auth/register")
        .send({ username: "sandra", email: "s@s.com", password: "" })
        .end(function (err, res) {
          console.log(res.body);
          expect(res).to.have.status(500);
          done();
        });
    });
    it("[R6] I try to register sending incorrect body", (done) => {
      chai
        .request(url)
        .post("/auth/register")
        .send({ name: "incorrect", emailuser: "i@i.com", pass: "111111" })
        .end(function (err, res) {
          console.log(res.body);
          expect(res).to.have.status(500);
          done();
        });
    });
  });

  describe('Categories endpoints', () => {
    it('[CAT1] should get all categories', (done) => {
      chai.request(url)
      .get('/categories')
      .set({ "x-access-token": `${token}` })
        .end( function(err,res){
          console.log(res.body)
          expect(res).to.have.status(200);
          done();
        });
    });
    it("[CAT2] should create a category", (done) => {
      chai
        .request(url)
        .post("/categories")
        .set({ "x-access-token": `${token}` })
        .send({ name: "category-test", imgUrl: "www.googgle.com", movies: [] })
        .end(function (err, res) {
          console.log(res.body);
          expect(res).to.have.status(201);
          done();
        });
    });
  });
  

});
