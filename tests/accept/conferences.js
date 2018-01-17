var server = require('../../test');
var chai = require('chai');
var chaiHttp = require('chai-http');
var User = require('../../models/user').User;
var Conference = require('../../models/conference').Conference;
var Q = require('q');
var expect = require('chai').expect;

chai.should();
chai.use(chaiHttp);

var url = 'http://127.0.0.1:8002';

function getTestConferenceDetails() {
    return {
            "city": "Test City",
            "country": "Test Country",
            "info": "Test Info",
            "name": "Test Name",
            "state": "Test State",
            "date": "03-jul-2017",
            "sessions": [{
                    "date": "03-jul-2017",
                    "events": [{
                            "id": 1,
                            "start": "03-jul-2017 09:00:00",
                            "end": "03-jul-2017 10:00:00",
                            "title": "Lorem ipsum ",
                            "info": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut imperdiet elit magna, eget faucibus dui vehicula vitae. Sed volutpat fringilla quam posuere facilisis. Maecenas luctus faucibus diam vel luctus. Fusce eu arcu non nisl dignissim scelerisque. Morbi eget leo sit amet nunc posuere venenatis",
                            "attendees": []
                        },
                        {
                            "id": 2,
                            "start": "03-jul-2017 10:00:00",
                            "end": "03-jul-2017 11:00:00",
                            "title": "Pellentesque leo ligula",
                            "info": "Pellentesque leo ligula, vulputate eget placerat vitae, hendrerit sed nisl. Proin luctus velit elit, egestas molestie neque pulvinar quis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed eu hendrerit nibh, non porta quam. Phasellus vel turpis tempor, tincidunt odio laoreet, ornare dolor.",
                            "attendees": []
                        },
                        {
                            "id": 3,
                            "start": "03-jul-2017 11:00:00",
                            "end": "03-jul-2017 11:30:00",
                            "title": "Donec dolor nunc",
                            "info": "Donec dolor nunc, mollis sit amet rutrum a, mollis ac tortor. In rutrum imperdiet maximus. Fusce tincidunt lectus at aliquet vehicula. Praesent ac neque vitae massa egestas sodales nec non libero. Phasellus a pretium ante. Nam non orci quam. Sed non vehicula est.",
                            "attendees": []
                        },
                        {
                            "id": 4,
                            "start": "03-jul-2017 11:30:00",
                            "end": "03-jul-2017 12:30:00",
                            "title": "Morbi dignissim porttitor",
                            "info": "Morbi dignissim porttitor velit, vitae elementum sapien accumsan vel. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae, Etiam maximus, sem ac suscipit dictum, odio mi rhoncus justo, in tempus urna ligula a odio. Mauris auctor, massa vel malesuada sollicitudin, erat tellus lobortis tortor",
                            "attendees": []
                        },
                        {
                            "id": 5,
                            "start": "03-jul-2017 13:30:00",
                            "end": "03-jul-2017 13:30:00",
                            "title": "vitae lobortis lacus sapien a velit",
                            "info": "Vitae lobortis lacus sapien a velit. Nunc ac felis cursus, volutpat sapien et, aliquet ligula. Nullam vitae lacinia lectus. In interdum at ante et elementum. Quisque tristique placerat erat vitae ullamcorper. Sed varius eget ligula dictum rutrum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc sollicitudin tellus eu libero posuere hendrerit",
                            "attendees": []
                        },
                        {
                            "id": 6,
                            "start": "03-jul-2017 13:30:00",
                            "end": "03-jul-2017 14:00:00",
                            "title": "Pellentesque non mauris",
                            "info": "Pellentesque non mauris facilisis lectus sagittis sollicitudin. Etiam non tincidunt dui. Phasellus accumsan cursus dolor, quis egestas mi fermentum id. In accumsan varius leo eget vulputate. Curabitur venenatis hendrerit imperdiet. Vivamus egestas elit eget felis tempor iaculis. Cras at molestie ipsum, mattis suscipit nunc. Aliquam blandit blandit urna ac gravida. Curabitur at velit ut nisi tempor venenatis nec id nunc. Etiam elit quam, egestas id est sed, sagittis lacinia lectus. Pellentesque at ultricies ante. Aliquam ut tempor magna.",
                            "attendees": []
                        },
                        {
                                "id": 7,
                                "start": "04-jul-2017 14:00:00",
                                "end": "04-jul-2017 15:00:00",
                                "title": "Fusce commodo justo",
                                "info": "Fusce commodo justo ut rutrum egestas. Morbi vehicula justo ut fringilla ultricies. Nulla sit amet purus aliquam, congue velit vitae, tincidunt lacus. Phasellus rhoncus eros non libero tristique, quis tempus enim elementum. Nulla dictum rhoncus arcu, eu imperdiet quam commodo quis. Maecenas faucibus fermentum tortor, ut tincidunt turpis. ",
                                "attendees": []
                            },
                            {
                                "id": 8,
                                "start": "04-jul-2017 15:00:00",
                                "end": "04-jul-2017 15:30:00",
                                "title": "Morbi id finibus",
                                "info": " Morbi id finibus tortor, a pulvinar purus. Aliquam fringilla orci eu nunc ultricies volutpat. Sed tortor odio, lobortis eget dui sit amet, molestie ornare leo. Ut fringilla purus id est imperdiet mollis laoreet et ex. Donec quis nisi finibus, interdum ante quis, auctor diam. Aliquam erat volutpat. Nullam sed ex dignissim, sagittis tellus et, laoreet est. Donec mattis elementum ipsum, nec elementum neque gravida ac. Donec cursus enim nulla, eget ornare massa vestibulum sed. Pellentesque viverra turpis aliquet nisl dictum pretium.",
                                "attendees": []
                            },
                            {
                                "id": 9,
                                "start": "04-jul-2017 15:30:00",
                                "end": "04-jul-2017 16:00:00",
                                "title": "Donec sed ex ex",
                                "info": "Donec sed ex ex. Donec sodales leo mauris, sed condimentum risus rhoncus at. Sed viverra, tortor id egestas condimentum, mi tellus vehicula massa, cursus scelerisque orci erat non nunc. Mauris tincidunt eget odio ut hendrerit. Suspendisse gravida vitae elit a suscipit. Nulla ut lectus vehicula, scelerisque dui nec, varius nisi. Nulla facilisi. Sed lacus neque, porttitor lobortis dignissim eu, hendrerit vestibulum purus. Maecenas sagittis sollicitudin sodales. Ut quis posuere nunc. Mauris nec lacus at orci egestas fringilla. Vestibulum consequat eu quam a dictum.",
                                "attendees": []
                            },
                            {
                                "id": 10,
                                "start": "04-jul-2017 16:00:00",
                                "end": "04-jul-2017 16:30:00",
                                "title": "Proin eleifend felis",
                                "info": "Proin eleifend felis vel tortor luctus dictum. Vestibulum varius neque nec turpis placerat rhoncus eget et nulla. Aliquam tristique urna nec consequat gravida. Duis mattis, nibh sit amet vehicula elementum, nunc ante sodales leo, eget finibus erat ex vitae lacus. Vivamus in tincidunt massa, non convallis lectus. Pellentesque ornare scelerisque metus quis varius. Cras quis ex arcu. Integer nibh ante, mattis eget lectus nec, efficitur pellentesque sem.",
                                "attendees": []
                            }
                    ]
                },
                {
                    "date": "04-jul-2017",
                    "events": [
                        {
                            "id": 11,
                            "start": "04-jul-2017 09:00:00",
                            "end": "04-jul-2017 09:30:00",
                            "title": "Orci varius natoque",
                            "info": "Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam tincidunt sodales turpis, nec tincidunt neque finibus vitae. Fusce neque risus, vestibulum eu mauris et, sagittis malesuada velit. Donec finibus, mi quis euismod elementum, sem sapien dignissim metus, eu interdum enim arcu at erat. Praesent lorem est, pulvinar non semper sed, posuere a magna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae,",
                            "attendees": []
                        },
                        {
                            "id": 12,
                            "start": "04-jul-2017 09:30:00",
                            "end": "04-jul-2017 10:00:00",
                            "title": "Aliquam eget felis",
                            "info": "Phasellus non neque dictum, sagittis turpis at, dictum augue. Quisque pretium feugiat mauris, sit amet pulvinar velit ultricies sed. Cras vel est vitae urna egestas efficitur. Nullam lectus velit, rutrum a lorem vitae, convallis viverra ante. Phasellus ac tellus eget mauris iaculis scelerisque. Sed blandit fermentum",
                            "attendees": []
                        },
                        {
                            "id": 13,
                            "start": "04-jul-2017 10:00:00",
                            "end": "04-jul-2017 11:00:00",
                            "title": "Q + A && wrap up",
                            "info": "Aliquam eget felis sit amet augue convallis pharetra vel eget ante. Nam aliquam sit amet tortor quis eleifend. Mauris sed nisl diam. Sed quis turpis eget nulla ultricies porttitor eu nec nunc. Maecenas mi sapien, luctus nec elit id, dictum pellentesque nulla. Cras consectetur pulvinar tempor. Phasellus odio sem, tincidunt eu porttitor a, fermentum nec dui. Aliquam egestas tincidunt blandit. Nulla faucibus vehicula pharetra.",
                            "attendees": []
                        },
                        {
                            "id": 14,
                            "start": "04-jul-2017 11:00:00",
                            "end": "04-jul-2017 11:30:00",
                            "title": "Q + A && wrap up",
                            "info": "",
                            "attendees": []
                        },
                        {
                            "id": 15,
                            "start": "04-jul-2017 11:30:00",
                            "end": "04-jul-2017 12:30:00",
                            "title": "Sed ligula ex",
                            "info": "Sed ligula ex, dapibus eu nunc sed, rutrum congue tellus. Quisque nec volutpat risus. Ut in ipsum blandit, sodales arcu eu, aliquam ligula. Curabitur feugiat nisl ex, quis eleifend erat efficitur eu. Sed sollicitudin elementum dolor vitae consequat. Integer feugiat venenatis molestie. Nulla cursus purus fermentum, dignissim nibh vel, sollicitudin nulla. Phasellus sit amet urna consequat, hendrerit tortor pulvinar, sagittis velit.",
                            "attendees": []
                        },
                        {
                            "id": 16,
                            "start": "04-jul-2017 12:30:00",
                            "end": "04-jul-2017 13:00:00",
                            "title": "Aliquam posuere",
                            "info": "Aliquam posuere tellus mauris, nec feugiat libero efficitur at. Donec malesuada vel felis non commodo. Morbi vel ante sed erat suscipit dictum. Phasellus tempor nulla arcu, ac dignissim velit rutrum aliquam. Aenean ac finibus sem, quis tincidunt velit. Phasellus malesuada porttitor nisl ut finibus. Proin vulputate odio felis, nec finibus purus ultricies eu. Fusce feugiat porttitor dictum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis mi turpis, accumsan et tempor ac, lobortis ac nulla. Pellentesque a pellentesque velit. Nulla quis efficitur erat.",
                            "attendees": []
                        },
                        {
                            "id": 17,
                            "start": "04-jul-2017 13:00:00",
                            "end": "04-jul-2017 14:00:00",
                            "title": "Etiam tempus libero",
                            "info": "Etiam tempus libero ac laoreet vestibulum. Nulla at turpis maximus, pretium quam in, gravida nibh. Praesent semper tincidunt sem ut iaculis. Proin egestas mi neque, vitae consectetur elit rhoncus quis. Fusce rutrum id ipsum non varius. Cras non semper erat, in euismod diam. Nunc in efficitur sem, non molestie turpis.",
                            "attendees": []
                        },
                        {
                            "id": 18,
                            "start": "04-jul-2017 14:00:00",
                            "end": "04-jul-2017 14:30:00",
                            "title": "Suspendisse felis",
                            "info": "Suspendisse felis magna, ultrices eu nulla vitae, egestas malesuada arcu. Nulla quis efficitur est. Pellentesque lectus neque, vulputate at magna in, vulputate feugiat lectus. Pellentesque suscipit tortor auctor euismod malesuada. Quisque placerat purus congue metus pulvinar fermentum. Maecenas at consequat mauris. Nunc lacinia erat congue, elementum eros ut, suscipit ipsum.",
                            "attendees": []
                        },
                        {
                            "id": 19,
                            "start": "04-jul-2017 14:30:00",
                            "end": "04-jul-2017 15:00:00",
                            "title": "Donec nec ",
                            "info": "Donec nec dignissim nulla. Donec maximus odio et aliquet feugiat. Maecenas egestas non mauris et efficitur. Etiam non iaculis justo, nec iaculis risus. Donec suscipit blandit eros aliquam molestie. Curabitur eu ante metus. Vivamus turpis ex, rutrum sed fringilla at, blandit in massa. Vestibulum volutpat quam id tellus facilisis sagittis. Integer a dolor vitae massa euismod molestie nec in purus. Quisque in lacinia arcu.",
                            "attendees": []
                        },
                        {
                            "id": 20,
                            "start": "04-jul-2017 15:00:00",
                            "end": "04-jul-2017 15:30:00",
                            "title": "Aenean mollis",
                            "info": "Aenean mollis lacinia urna et scelerisque. Morbi id consequat sem. Aliquam tempor risus tortor, vitae facilisis quam mollis pharetra. Suspendisse quis est ultrices, malesuada turpis et, commodo ligula. Mauris ut tincidunt eros. Pellentesque efficitur tempor libero, a semper leo finibus id. Donec fermentum elit ligula, eget aliquam ipsum interdum id. Fusce interdum nunc id mattis bibendum. Proin iaculis at lorem sed convallis. Maecenas at posuere sapien, ut commodo tellus. Proin vel finibus arcu.",
                            "attendees": []
                        },
                        {
                            "id": 21,
                            "start": "04-jul-2017 15:30:00",
                            "end": "04-jul-2017 17:00:00",
                            "title": "Cras et enim",
                            "info": "Cras et enim non risus pretium tempus. Nam dignissim, elit sed tristique luctus, ante elit rutrum dui, ut vestibulum purus nunc et est. Suspendisse et consectetur mi, non sagittis mi. Fusce vel augue magna. Proin porttitor sapien id odio euismod aliquam. Aenean pellentesque tincidunt iaculis. Mauris ut auctor ipsum. Sed justo leo, posuere vitae sem sit amet, accumsan consectetur mauris.",
                            "attendees": []
                        },
                        {
                            "id": 22,
                            "start": "04-jul-2017 17:00:00",
                            "end": "04-jul-2017 17:30:00",
                            "title": "Fusce tincidunt",
                            "info": "Fusce tincidunt leo dolor, ac congue nisi suscipit a. Suspendisse eget ipsum purus. Curabitur cursus accumsan gravida. Donec ex odio, maximus sed sapien sit amet, sagittis viverra nibh. Nam purus neque, efficitur nec felis at, elementum sollicitudin est. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis risus quam, tristique vel facilisis in, aliquam et metus. Praesent pellentesque pharetra porta. Nullam vel magna non ligula bibendum auctor.",
                            "attendees": []
                        }
                    ]
                }
            ]
        }
    };

describe('Conferences', function() {

    describe('/POST conference', function() {
        it('should create a conference', function(done) {
            // create user with given parameters
            conference = getTestConferenceDetails();
            chai.request(url)
                .post('/api/conferences')
                .send(conference)
                .end(function(err, res) {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    expect(res.body.name).to.be.a('string');
                    expect(res.body.name).to.equal("Test Name");
                    expect(res.body.sessions).to.be.a('array');
                    expect(res.body.sessions.length).to.equal(2);
                    expect(res.body.info).to.be.a('string');
                    expect(res.body.info).to.equal("Test Info");
                    expect(res.body.city).to.be.a('string');
                    expect(res.body.city).to.equal("Test City");
                    expect(res.body.state).to.be.a('string');
                    expect(res.body.state).to.equal("Test State");
                    expect(res.body.country).to.be.a('string');
                    expect(res.body.country).to.equal("Test Country");
                    done();
                });
        });
    });

    describe('/GET conferences', function() {
        it('should return a list of conferences', function(done) {
            chai.request(url)
                .get('/api/conferences')
                .end(function(err, res) {
                    res.body.conferences.should.be.a('array');
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/PUT conference', function() {
        it('should update a conference', function(done) {
            var testConference = getTestConferenceDetails();
            chai.request(url)
                .post('/api/conferences')
                .send(testConference)
                .end(function(err, res) {
                    expect(res.body.name).to.equal("Test Name");
                    Conference.findOne({}, function(err, testConference) {
                        var id = testConference._id;
                        chai.request(url)
                            .put('/api/conferences/' + id)
                            .set('content-type', 'application/json')
                            .send({
                              "city": "City",
                              "country": "Country",
                              "info": "Info",
                              "name": "Name",
                              "state": "State",
                              "url": "http://testconference.com/",
                              "sessions": [{
                                      "date": "03-jul-2017",
                                      "events": [{
                                              "id": 1,
                                              "start": "03-jul-2017 09:00:00",
                                              "end": "03-jul-2017 10:00:00",
                                              "title": "Fusce tincidunt",
                                              "info": "Fusce tincidunt leo dolor, ac congue nisi suscipit a. Suspendisse eget ipsum purus. Curabitur cursus accumsan gravida. Donec ex odio, maximus sed sapien sit amet, sagittis viverra nibh. Nam purus neque, efficitur nec felis at, elementum sollicitudin est. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis risus quam, tristique vel facilisis in, aliquam et metus. Praesent pellentesque pharetra porta. Nullam vel magna non ligula bibendum auctor.",
                                              "attendees": []
                                          },
                                          {
                                              "id": 2,
                                              "start": "03-jul-2017 10:00:00",
                                              "end": "03-jul-2017 11:00:00",
                                              "title": "Fusce tincidunt",
                                              "info": "Fusce tincidunt leo dolor, ac congue nisi suscipit a. Suspendisse eget ipsum purus. Curabitur cursus accumsan gravida. Donec ex odio, maximus sed sapien sit amet, sagittis viverra nibh. Nam purus neque, efficitur nec felis at, elementum sollicitudin est. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis risus quam, tristique vel facilisis in, aliquam et metus. Praesent pellentesque pharetra porta. Nullam vel magna non ligula bibendum auctor.",
                                              "attendees": []
                                          }
                                      ]
                                  },
                                  {
                                      "date": "04-jul-2017",
                                      "events": [{
                                              "id": 3,
                                              "start": "04-jul-2017 09:00:00",
                                              "end": "04-jul-2017 11:00:00",
                                              "title": "Fusce tincidunt",
                                              "info": "Fusce tincidunt leo dolor, ac congue nisi suscipit a. Suspendisse eget ipsum purus. Curabitur cursus accumsan gravida. Donec ex odio, maximus sed sapien sit amet, sagittis viverra nibh. Nam purus neque, efficitur nec felis at, elementum sollicitudin est. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis risus quam, tristique vel facilisis in, aliquam et metus. Praesent pellentesque pharetra porta. Nullam vel magna non ligula bibendum auctor.",
                                              "attendees": []
                                          },
                                          {
                                              "id": 4,
                                              "start": "04-jul-2017 11:00:00",
                                              "end": "04-jul-2017 11:30:00",
                                              "title": "Fusce tincidunt",
                                              "info": "Fusce tincidunt leo dolor, ac congue nisi suscipit a. Suspendisse eget ipsum purus. Curabitur cursus accumsan gravida. Donec ex odio, maximus sed sapien sit amet, sagittis viverra nibh. Nam purus neque, efficitur nec felis at, elementum sollicitudin est. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis risus quam, tristique vel facilisis in, aliquam et metus. Praesent pellentesque pharetra porta. Nullam vel magna non ligula bibendum auctor.",
                                              "attendees": []
                                          }
                                      ]
                                  }
                              ]
                            })
                            .end(function(err, res) {
                                res.should.have.status(200);
                                done();
                            });
                    });
                });
        });
    });


    describe('/DELETE conference', function() {
        it('should get created conference based on conference_id and remove this conference', function(done) {
            var testConference = getTestConferenceDetails();
            chai.request(url)
                .post('/api/conferences')
                .set('content-type', 'application/json')
                .send(testConference)
                .end(function(err, res) {
                    expect(res.body.name).to.equal("Test Name");
                    var id = res.body._id;
                    chai.request(url)
                        .del('/api/conferences/' + id)
                        .end(function(err, res) {
                            res.should.have.status(200);
                            done();
                        });
                });
        });
    });

    after(function(done) {
        chai.request(url)
            .del('/api/deleteallconferences')
            .end(function(err, res) {
                res.should.not.have.status(500);
                done();
            });
    });

});
