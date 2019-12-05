var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
const api_host = 'http://localhost';
const api_port = '8000';
const api_url = api_host + ":" + api_port;
var expect = chai.expect;
var buyerToken;
var sellerToken;
var app = require('../app');

it("check if API server is up and running", function(done){
    chai.request(api_url)
    .get('/api/')
    .send()
    .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('Welcome to GrubHub API layer');
        done();
    });
})

it("Check valid customer login", function(done){
    chai.request(api_url)
    .post('/api/login')
    .send({"email":"snayak@grub.com","password":"password123","option":"1"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.success).to.equal(true);
        buyerToken = res.body.msgDesc.token;
        done();
    });
})
it("Check valid restaurant login", function(done){
    chai.request(api_url)
    .post('/api/login')
    .send({"email":"markj@gmail.com","password":"password123","option":"2"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.success).to.equal(true);
        sellerToken = res.body.msgDesc.token;
        done();
    });
})

it("Check if fetched profile details is correct", function(done){
    chai.request(api_url)
    .get('/api/buyer?id=5da654a5c7eb3242c83d39c9')
    .set("Authorization", "Bearer " + buyerToken)
    .send()
    .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.msg).to.equal('Successfully fetched the buyer profile');
        expect(res.body.msgDesc._id).to.equal('5da654a5c7eb3242c83d39c9');
        done();
    });
})

it("Checking if restaurant search returns atleast one restaurant", function(done){
    chai.request(api_url)
    .get('/api/search?searchKey=a')
    .set("Authorization", "Bearer " + buyerToken)
    .send()
    .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.content).to.be.a('Array');
        expect(res.body.content).to.have.length.greaterThan(1);
        done();
    });
})


it("Checking if restaurant order history returns atleast one order", function(done){
    chai.request(api_url)
    .get('/api/order/restaurant?rest_id=5dbc9b4f1ddf47494858ad84')
    .set("Authorization", "Bearer " + sellerToken)
    .send()
    .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.msgDesc).to.be.a('Array');
        expect(res.body.msgDesc).to.have.length.greaterThan(1);
        done();
    });
})

it("Checking if user is able to get items sold by a restaurant in details view", function(done){
    chai.request(api_url)
    .get('/api/seller/menu?rest_id=5dbc9b4f1ddf47494858ad84')
    .set("Authorization", "Bearer " + buyerToken)
    .send()
    .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.msgDesc).to.be.a('Array');
        expect(res.body.msgDesc).to.have.length.greaterThan(1);
        done();
    });
})

