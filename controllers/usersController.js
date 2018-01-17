var User = require('../models/user').User;
var Conference = require('../models/conference').Conference;
var Attendee = require('../models/attendee').Attendee;
var Q = require('q');

exports.index = function(req, res) {
  function getUsers() {
      var foundUsers;
      return Q(User.find({}).exec())
          .then(function(users) {
              foundUsers = users;
              return foundUsers;
          })
  };

  getUsers()
  .then(function(users) {
      var userList = []
      for(var i = 0; i < users.length; i++){
        var user = {name: users[i].name, _id: users[i]._id, email: users[i].email, phone_number: users[i].phone_number}
        userList.push(user);
      }

      res.json(200, userList);
  })
  .catch(function(err) {
      res.json(500, err);
  })
  .done(function() {

  });
}

exports.show = function(req, res) {
  var id = req.params.id;
  User.findById(id, function(err, doc) {
    if(!err && doc) {
      res.json(200, doc);
    } else if(err) {
      res.json(500, { message: "Error loading user." + err});
    } else {
      res.json(404, { message: "User not found."});
    }
  });
}

exports.markAllMsgsRead= function(req, res) {
  function getUsers() {
      var foundConference;
      return Q(User.find({}).exec())
          .then(function(users) {
              foundUsers = users;
              return foundUsers;
          })
  };

  getUsers()
  .then(function(users) {
      for(var i = 0; i < users.length; i++){
        for(var j = 0 ;j < users[i].messages.length; j++) {
          //console.log(users[i].messages[j]);
          if(users[i].messages[j] != null) {
            var newMessage = users[i].messages[j];
            newMessage.read = true;
            users[i].messages.set(j, newMessage);
            users[i].save();
          }
        }
      }
      res.json(200, {message: "all users updated"});
  })
  .catch(function(err) {
      res.json(500, err);
  })
  .done(function() {

  });
}

exports.bookmark = function(req, res) {
  var user_id = req.params.user_id;
  var name = req.body.name;
  var conference_id = req.params.id;
  var isBookmarked = req.body.isBookmarked;
  var event_id = req.body.event_id

  function getConference(conference_id) {
      var foundConference;
      return Q(Conference.findById(conference_id).exec())
          .then(function(conference) {
              foundConference = conference;
              return foundConference;
          })
  };

  getConference(conference_id)
  .then(function(conference) {
        for (var i = 0; i < conference.sessions.length; i++) {
            for (var j = 0; j < conference.sessions[i].events.length; j++) {
                if (conference.sessions[i].events[j].id == event_id) {
                    console.log("conf event id: " + conference.sessions[i].events[j].id);
                    console.log("is bookmarked: " + isBookmarked);
                    if (isBookmarked == true) {
                        var attendee = new Attendee();
                        attendee.user_id = user_id;
                        attendee.name = name;
                        console.log("attendees: " + conference.sessions[i].events[j].attendees);
                        conference.sessions[i].events[j].attendees.push(attendee);
                        conference.markModified('sessions');
                        conference.save();
                        console.log("attendees: " + conference.sessions[i].events[j].attendees);
                    } else {
                        for (var k = 0; k < conference.sessions[i].events[j].attendees.length; k++) {
                            if (conference.sessions[i].events[j].attendees[k].user_id == user_id) {
                                conference.sessions[i].events[j].attendees.splice(k, 1);
                                conference.markModified('sessions');
                                conference.save();
                            }
                        }
                    }
                }
            }
        }
      res.json(200, "bookmark updated");
  })
  .catch(function(err) {
      res.json(500, err);
  })
  .done(function() {

  });
}

exports.authenticate = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  function getUser(email) {
      var foundUser;
      return Q(User.find({'email': email}).exec())
          .then(function(user) {
              foundUser = user;
              return user;
          })
  };

  getUser(email)
  .then(function(user) {
    if (user[0].password === password) {
      res.json(200, user[0]);
    } else {
      res.json(401, { message: "Incorrect password"});
    }
  })
  .catch(function(err) {
      res.json(500, { message: "Invalid credentials"});
  })
  .done(function() {

  });
}

exports.create = function(req, res) {

    var newUser = new User();
    newUser.name = req.body.name;
    newUser.dob = req.body.dob;
    newUser.email = req.body.email;
    newUser.phone_number = req.body.phone_number;
    newUser.username = req.body.username;
    newUser.password = req.body.password;
    newUser.messages = [];

    newUser.save(function(err) {
      if(!err) {
        res.json(201, newUser);
      } else {
        res.json(500, {message: "Could not create user. Error: " + err});
      }
    });
}

exports.update = function(req, res) {

  var id = req.params.id;

  User.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.name = req.body.name;
      doc.dob = req.body.dob;
      doc.email = req.body.email;
      doc.phone_number = req.body.phone_number;
      doc.username = req.body.username;
      doc.password = req.body.password;
      doc.save(function(err) {
        if(!err) {
          res.json(200, {message: "User updated: " + req.body.name});
        } else {
          res.json(500, {message: "Could not update user. " + err});
        }
      });
    } else if(!err) {
      res.json(404, { message: "Could not find user."});
    } else {
      res.json(500, { message: "Could not update user." + err});
    }
  });
}

exports.destroy = function(req, res) {

  var id = req.params.id;

  function getConferences() {
      var foundConferences;
      return Q(Conference.find().exec())
          .then(function(conferences) {
              foundConferences = conferences;
              return foundConferences;
          })
  };

  getConferences()
  .then(function(conferences) {
      for(var h = 0; h < conferences.length; h++) {
        for(var i = 0; i < conferences[h].sessions.length; i++) {
          for(var j = 0; j < conferences[h].sessions[i].events.length; j++) {
                for(var k = 0; k < conference.sessions[i].events[j].attendees.length; k++) {
                  if(conferences[h].sessions[i].events[j].attendees[k].user_id == user_id) {
                    conferences[h].sessions[i].events[j].attendees.splice(k,1);
                    conferences[h].markModified('sessions');
                    conferences[h].save();
                  }
                }
              }
          }
        }
  })
  .catch(function(err) {
      res.json(500, err);
  })
  .done(function() {

  });
  User.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      res.json(200, { message: "User removed."});
    } else if(!err) {
      res.json(404, { message: "Could not find user."});
    } else {
      res.json(403, {message: "Could not delete user. " + err });
    }
  });

}

exports.deleteAllUsers = function(req, res) {
  User.remove({}, function(err, doc) {
    if (err) {
      res.json(500, {message: "Error: " + err});
    } else {
      res.end('all users removed');
    }
  });
}
