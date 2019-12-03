var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
const api_host = 'http://localhost';
const api_port = '8000';
const api_url = api_host + ":" + api_port;
var expect = chai.expect;
var app = require('../app');
userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZDMwMmFkNTkzYjZiNDg1ODFiODg2YSIsIm5hbWUiOiJOYXJpc2h0MiIsImNpdHkiOiJQVU5FIiwic3RhdGUiOm51bGwsInppcCI6bnVsbCwicGhvbmVfbm8iOm51bGwsImF2YXRhciI6IjY5ZDlhNWQ5MTUwNjJiNGJmZTU1NzRiNDE2ODVmYWIxIiwiZGVzY3JpcHRpb24iOiJndWQgbW9yaW5pZyIsImhhbmRsZSI6Im5kaGF5bmkiLCJkX29fYiI6bnVsbCwiaWF0IjoxNTc1Mzk3ODY4LCJleHAiOjE1NzU5OTc4Njh9.UWfz3G9tnPktb_yCk_QasIDNkmM4Xtvot359niRwEGQ"
user_id = '5dd302ad593b6b48581b886a'

it("User Login", function (done) {
    chai.request(api_url)
        .post('/user/login')
        .send({ username_or_email_or_phone: "test@gmail.com", password: "admin" })
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body.success).to.equal(true);
            done();
        });
})

it("fetch newsfeed", function (done) {
    chai.request(api_url)
        .get('/user/newsfeed?id=5dd302ad593b6b48581b886a')
        .set("Authorization", "Bearer " + userToken)
        .send()
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body.success).to.equal(true);
            done();
        });
})


it("fetch conversations", function (done) {
    chai.request(api_url)
        .get('/conversation/heads?id=5dd302ad593b6b48581b886a')
        .set("Authorization", "Bearer " + userToken)
        .send()
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body.success).to.equal(true);
            done();
        });
})


it("fetch all the tweets for a particular hastags", function (done) {
    chai.request(api_url)
        .get('/hashtag?hashtag_id=5de573a0675bf31de7bf2c86')
        .set("Authorization", "Bearer " + userToken)
        .send()
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body.success).to.equal(true);
            done();
        });
})


it("like a tweet", function (done) {
    chai.request(api_url)
        .put('/api/tweet/like?id=5dd241d11ae34e6ce218074f&user_id=5dd302ad593b6b48581b886a')
        .set("Authorization", "Bearer " + userToken)
        .send()
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body.success).to.equal(true);
            done();
        });
})


it("unlike a tweet", function (done) {
    chai.request(api_url)
        .delete('/api/tweet/like?id=5dd241d11ae34e6ce218074f&user_id=5dd302ad593b6b48581b886a')
        .set("Authorization", "Bearer " + userToken)
        .send()
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body.success).to.equal(true);
            done();
        });
})


it("bookmark a tweet", function (done) {
    chai.request(api_url)
        .delete('/api/tweet/like?tweet_id=5dd241d11ae34e6ce218074f&user_id=5dd302ad593b6b48581b886a')
        .set("Authorization", "Bearer " + userToken)
        .send()
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body.success).to.equal(true);
            done();
        });
})

it("get a tweet", function (done) {
    chai.request(api_url)
        .get('/api/tweet?id=5dd241d11ae34e6ce218074f')
        .set("Authorization", "Bearer " + userToken)
        .send()
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body.success).to.equal(true);
            done();
        });
})


it("get a tweet", function (done) {
    chai.request(api_url)
        .get('/api/tweet?id=5dd241d11ae34e6ce218074f')
        .set("Authorization", "Bearer " + userToken)
        .send()
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body.success).to.equal(true);
            done();
        });
})

it("get recommensations for a user", function (done) {
    chai.request(api_url)
        .get('/recommendation?user_id=5dd302ad593b6b48581b886a')
        .set("Authorization", "Bearer " + userToken)
        .send()
        .end(function (err, res) {
            expect(res).to.have.status(200);
            expect(res.body.success).to.equal(true);
            done();
        });
})