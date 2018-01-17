var server = require('../../test');
var chai = require('chai');
var chaiHttp = require('chai-http');
var User = require('../../models/user').User;
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
        "email": "testuser@gmail.com",
        "username": "testtwo",
        "password": "Password1",
        "phone_number": 0859879999
    };
}

describe('Users', function() {

    describe('/POST user', function() {
        it('should create a user', function(done) {
            // create user with given parameters
            user = getTestUserDetails();
            chai.request(url)
                .post('/api/signup')
                .send(user)
                .end(function(err, res) {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    expect(res.body.name).to.be.a('string');
                    expect(res.body.name).to.equal("Test Name");
                    expect(res.body.email).to.be.a('string');
                    expect(res.body.email).to.equal("testuser@gmail.com");
                    expect(res.body.phone_number).to.be.a('number');
                    expect(res.body.phone_number).to.equal(0859879876);
                    expect(res.body.username).to.be.a('string');
                    expect(res.body.username).to.equal("testuser");
                    expect(res.body.password).to.be.a('string');
                    expect(res.body.password).to.equal("Password1");
                    done();
                });
        });
    });

    describe('/GET users', function() {
        it('should return a list of users', function(done) {
            chai.request(url)
                .get('/api/users')
                .end(function(err, res) {
                    res.body.should.be.a('array');
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/PUT user', function() {
        it('should update a user', function(done) {
            var testUser = getSecondTestUserDetails();
            chai.request(url)
                .post('/api/signup')
                .send(testUser)
                .end(function(err, res) {
                    expect(res.body.name).to.equal("Test Two");
                    User.findOne({}, function(err, testUser) {
                        var id = testUser._id;
                        chai.request(url)
                            .put('/api/users/' + id)
                            .set('content-type', 'application/json')
                            .send({
                                'username': 'some very long username',
                                "dob": "22-jan-1981",
                                "name": "Test Two",
                                "email": "testuser@gmail.com",
                                "password": "Password1",
                                "phone_number": 0859879999
                            })
                            .end(function(err, res) {
                                res.should.have.status(200);
                                done();
                            });
                    });
                });
        });
    });

    describe('/POST user', function() {
        it('should authenticate user', function(done) {
            user = getTestUserDetails();
            chai.request(url)
                .post('/api/authenticate')
                .send(user)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    expect(res.body.name).to.be.a('string');
                    expect(res.body.email).to.be.a('string');
                    expect(res.body.phone_number).to.be.a('number');
                    expect(res.body.username).to.be.a('string');
                    expect(res.body.password).to.be.a('string');
                    done();
                });
        });
    });

    describe('/DELETE user', function() {
        it('should get created user based on user_id and remove this user', function(done) {
            var testUser = getTestUserDetails();
            chai.request(url)
                .post('/api/signup')
                .set('content-type', 'application/json')
                .send(testUser)
                .end(function(err, res) {
                    expect(res.body.email).to.equal("testuser@gmail.com");
                        var id = res.body._id;
                        chai.request(url)
                            .get('/api/users/delete/' + id)
                            .end(function(err, res) {
                                res.should.have.status(200);
                                done();
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
