var User = require('../models/user').User;
var Conference = require('../models/conference').Conference;
var Q = require('q');

exports.index = function(req, res) {
  Conference.find({}, function(err, docs) {
    if(!err) {
      res.json(200, { conferences: docs });
    } else {
      res.json(500, { message: err });
    }
  });
}

exports.show = function(req, res) {
  var id = req.params.id;
  Conference.findById(id, function(err, doc) {
    if(!err && doc) {
      res.json(200, doc);
    } else if(err) {
      res.json(500, { message: "Error loading conference." + err});
    } else {
      res.json(404, { message: "Conference not found."});
    }
  });
}

exports.create = function(req, res) {

    var newConference = new Conference();
    newConference.name = req.body.name;
    newConference.sessions = req.body.sessions;
    newConference.info = req.body.info;
    newConference.city = req.body.city;
    newConference.state = req.body.state;
    newConference.country = req.body.country;

    newConference.save(function(err) {
      if(!err) {
        res.json(201, newConference);
      } else {
        res.json(500, {message: "Could not create conference. Error: " + err});
      }
    });
}

exports.update = function(req, res) {


  var id = req.params.id;
  Conference.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.name = req.body.name;
      doc.sessions = req.body.sessions;
      doc.state = req.body.state;
      doc.city = req.body.city;
      doc.country = req.body.country;
      doc.info = req.body.info;
      doc.save(function(err) {
        if(!err) {
          res.json(200, {message: "Conference updated: " + req.body.name});
        } else {
          res.json(500, {message: "Could not update conference. " + err});
        }
      });
    } else if(!err) {
      res.json(404, { message: "Could not find conference."});
    } else {
      res.json(500, { message: "Could not update conference." + err});
    }
  });
}

exports.destroy = function(req, res) {

  var id = req.params.id;
  Conference.findById(id, function(err, doc) {
    if(!err && doc) {
      doc.remove();
      res.json(200, { message: "Conference removed."});
    } else if(!err) {
      res.json(404, { message: "Could not find conference."});
    } else {
      res.json(403, {message: "Could not delete conference. " + err });
    }
  });
}

exports.deleteAllConferences = function(req, res) {
  Conference.remove({}, function(err, doc) {
    if (err) {
      res.json(500, {message: "Error: " + err});
    } else {
      res.end('all conferences removed');
    }
  });
}
