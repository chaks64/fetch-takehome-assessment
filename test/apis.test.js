const chai = require("chai");
const chaiHTTP = require("chai-http");
const expect = chai.expect;
let app = require("../index");
let validID = "";
const {
  successReceipt,
  errorReceipt,
  inValidID,
  duplicateReceipt,
} = require("./testData.api");

//Assertion stle
chai.should();

chai.use(chaiHTTP);

describe("Test Fetch APIs", () => {
  //Sample test api
  it("should return a welcome message", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("Welcome");
        done();
      });
  });

  //store and create an ID for receipt (Success case)
  it("should store and return ID with status 200", (done) => {
    chai
      .request(app)
      .post("/receipts/process")
      .send(successReceipt)
      .end((err, res) => {
        try {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.property("id");
          validID = res.body.id
          done();
        } catch (error) {
          done(error);
        }
      });
  });

  //store and create an ID for receipt (Error/Fail case)
  it("should return error(invalid receipt) with status 400", (done) => {
    chai
      .request(app)
      .post("/receipts/process")
      .send(errorReceipt)
      .end((err, res) => {
        try {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("error");
          expect(res.body.error).to.equal("The receipt is invalid");
          done();
        } catch (error) {
          done(error);
        }
      });
  });


  it("should return error(duplicate receipt) with status 400", (done) => {
    chai
      .request(app)
      .post("/receipts/process")
      .send(duplicateReceipt)
      .end((err, res) => {
        try {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("error");
          expect(res.body.error).to.equal("duplicate receipt");
          done();
        } catch (error) {
          done(error);
        }
      });
  });

  //return valid calculated points for valid id
  it("should return points for a valid receipt ID", (done) => {
    chai
      .request(app)
      .get(`/receipts/${validID}/points`)
      .end((err, res) => {
        try {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.property("points");
          done();
        } catch (error) {
          done(error);
        }
      });
  });

  //return error for invalid id
  it("should return error(ID not found) for an invalid receipt ID", (done) => {
    chai
      .request(app)
      .get(`/receipts/${inValidID}/points`)
      .end((err, res) => {
        try {
          expect(res).to.have.status(404);
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.property("error");
          expect(res.body.error).to.equal(`No receipt found for ${inValidID} id`);  
          done();
        } catch (error) {
          done(error);
        }
      });
  });
});
