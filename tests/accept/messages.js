var server = require('../../test');
var chai = require('chai');
var chaiHttp = require('chai-http');
var User = require('../../models/user').User;
var Message = require('../../models/message').Message;
var Q = require('q');
var expect = require('chai').expect;

chai.should();
chai.use(chaiHttp);

var url = 'http://127.0.0.1:8002';

function getTestUserDetails() {
    return {
        "dob": "22-jan-1981",
        "name": "Test Name",
        "email": "testuser@gmail.com",
        "username": "testuser",
        "password": "Password1",
        "phone_number": 0859879876
    };
}

function getSecondTestUserDetails() {
    return {
        "dob": "22-jan-1981",
        "name": "Test Two",
        "email": "testtwo@gmail.com",
        "username": "testtwo",
        "password": "Password1",
        "phone_number": 0859879999
    };
}

describe('Messages', function() {

    describe('/POST message', function() {
        it('should create a user and send message', function(done) {
            var testUser = getTestUserDetails();
            chai.request(url)
                .post('/api/signup')
                .send(testUser)
                .end(function(err, res) {
                    expect(res.body.name).to.equal("Test Name");
                    User.findOne({}, function(err, testUser) {
                        var id = testUser._id;
                        chai.request(url)
                            .post('/api/users/' + id + '/messages')
                            .set('content-type', 'application/json')
                            .send({
                                'user_id': '123abc456',
                                "content": "test content"
                            })
                            .end(function(err, res) {
                                res.should.have.status(200);
                                done();
                            });
                    });
                });
        });
    });

    describe('/GET messages', function() {
        it('should create a user, send message and then retrieve messages', function(done) {
            var testUser = getTestUserDetails();
            chai.request(url)
                .post('/api/signup')
                .send(testUser)
                .end(function(err, res) {
                    expect(res.body.name).to.equal("Test Name");
                    User.findOne({}, function(err, testUser) {
                        var id = testUser._id;
                        chai.request(url)
                            .post('/api/users/' + id + '/messages')
                            .set('content-type', 'application/json')
                            .send({
                                'user_id': '123abc456',
                                "content": "test content"
                            })
                            .end(function(err, res) {
                                res.should.have.status(200);
                                chai.request(url)
                                    .get('/api/users/' + id + '/messages')
                                    .end(function(err, res) {
                                        res.should.have.status(200);
                                        done();
                                    });
                            });
                    });
                });
        });
    });

    describe('/GET unread messages\' senders', function() {
        it('should create a user, send message and get list of senders with unread messages', function(done) {
            var testUser = getTestUserDetails();
            chai.request(url)
                .post('/api/signup')
                .send(testUser)
                .end(function(err, res) {
                    expect(res.body.name).to.equal("Test Name");
                    User.findOne({}, function(err, testUser) {
                        var id = testUser._id;
                        chai.request(url)
                            .get('/api/users/' + id + '/unread')
                            .set('content-type', 'application/json')
                            .send({
                                'user_id': '123abc456',
                                "content": "test content"
                            })
                            .end(function(err, res) {
                                res.should.have.status(200);
                                done();
                            });
                    });
                });
        });
    });


    describe('/GET conversation', function() {
        it('should get list of messages between two specified users', function(done) {
            var testUser = getTestUserDetails();
            chai.request(url)
                .post('/api/signup')
                .set('content-type', 'application/json')
                .send(testUser)
                .end(function(err, res) {
                    expect(res.body.email).to.equal("testuser@gmail.com");
                    User.findOne({}, function(err, testUser) {
                        var id = testUser._id;
                        var testTwo = getSecondTestUserDetails();
                        chai.request(url)
                            .post('/api/signup')
                            .set('content-type', 'application/json')
                            .send(testTwo)
                            .end(function(err, res) {
                                expect(res.body.email).to.equal("testtwo@gmail.com");
                                User.findOne({}, function(err, testTwo) {
                                    var other_user_id = testTwo._id;
                                    chai.request(url)
                                        .post('/api/users/' + id + '/messages')
                                        .set('content-type', 'application/json')
                                        .send({
                                            'user_id': other_user_id,
                                            "content": "test content"
                                        })
                                        .end(function(err, res) {
                                            res.should.have.status(200);
                                            chai.request(url)
                                                .get('/api/users/' + id + '/messages/' + other_user_id)
                                                .end(function(err, res) {
                                                    res.should.have.status(200);
                                                    done();
                                                });
                                        });
                                });
                            });
                    });
                });
        });
    });

    after(function(done) {
        chai.request(url)
            .del('/api/users/deleteallusers')
            .end(function(err, res) {
                res.should.not.have.status(500);
                done();
            });
    });

});
