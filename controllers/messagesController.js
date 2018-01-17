var Message = require('../models/message').Message;
var User = require('../models/user').User
var Q = require('q');

exports.show = function(req, res) {

  var user_id = req.params.user_id;
  function getUser(user_id) {
      var foundUser;
      return Q(User.findById(user_id).exec())
          .then(function(user) {
              foundUser = user;
              return foundUser;
          })
  };

  getUser(user_id)
  .then(function(user) {
      res.json(200, user.messages);
  })
  .catch(function(err) {
      res.json(500, err);
  })
  .done(function() {
  })
}

exports.showConversation = function(req,res) {
  var user_id = req.params.user_id;
  var other_user_id = req.params.sender_id;
  function getUser(user_id) {
      var foundUser;
      return Q(User.findById(user_id).exec())
          .then(function(user) {
              foundUser = user;
              return foundUser;
          })
  };

  getUser(user_id)
  .then(function(user) {
      var messages = new Array();
      for(var i = 0; i < user.messages.length; i++) {
        if((user.messages[i].sender_id == user_id && user.messages[i].receiver_id == other_user_id) || (user.messages[i].receiver_id == user_id && user.messages[i].sender_id == other_user_id))
        messages.push(user.messages[i]);
      }
      res.json(200, messages);
  })
  .catch(function(err) {
      res.json(500, err);
  })
  .done(function() {
  })
}

exports.unread = function(req, res) {

  var user_id = req.params.user_id;
  function getUser(user_id) {
      var foundUser;
      return Q(User.findById(user_id).exec())
          .then(function(user) {
              foundUser = user;
              return foundUser;
          })
  };

  getUser(user_id)
  .then(function(user) {
      var unreadSenders = new Set();
      for(var i = 0; i < user.messages.length; i++) {
        if(user.messages[i].read == false) {
          unreadSenders.add(user.messages[i].receiver_id)
          unreadSenders.add(user.messages[i].sender_id)
        }
      }
      unreadSenders.delete(user_id)
      res.json(200, Array.from(unreadSenders));
  })
  .catch(function(err) {
      res.json(500, err);
  })
  .done(function() {
  })
}

exports.create = function(req, res) {

    var sendersMessage = new Message();
    var receiversMessage = new Message();
    var sender_id = req.params.user_id;
    var receiver_id = req.body.receiver_id;
    var error = "error occured"
    var didOccured = false;

    sendersMessage.receiver_id = receiver_id;
    sendersMessage.sender_id = sender_id;
    sendersMessage.content = req.body.content;
    sendersMessage.date = Date.now();
    receiversMessage.receiver_id = receiver_id;
    receiversMessage.sender_id = sender_id;
    receiversMessage.content = req.body.content;
    receiversMessage.read = false;
    receiversMessage.date = sendersMessage.date;
    sendersMessage.read = true;

    function getUser(user_id) {
        var foundUser;
        return Q(User.findById(user_id).exec())
            .then(function(user) {
                foundUser = user;
                return foundUser;
            })
    };

    getUser(receiver_id)
    .then(function(user) {
        user.messages.push(receiversMessage);
        user.save();
    })
    .catch(function(err) {
        didOccured = true
    })
    .done(function() {

    });

    getUser(sender_id)
    .then(function(user) {
        user.messages.push(sendersMessage);
        user.save();
    })
    .catch(function(err) {
        didOccured = true
    })
    .done(function() {

    });
    if (!didOccured) {
      res.json(200, {message: 'message sent'});
    }

}

exports.update = function(req, res) {

  var user_id = req.params.user_id;
  var other_user_id = req.body.other_user_id;
  function getUser(user_id) {
      var foundUser;
      return Q(User.findById(user_id).exec())
          .then(function(user) {
              foundUser = user;
              return foundUser;
          })
  };

  getUser(user_id)
  .then(function(user) {
      for(var i = 0; i < user.messages.length; i++) {
        if((user.messages[i].receiver_id == user_id && user.messages[i].sender_id == other_user_id)) {
          var newMessage = user.messages[i];
          newMessage.read = true;
          user.messages.set(i, newMessage);
        }
      }
      user.save();
      res.json(200, user);
  })
  .catch(function(err) {
      res.json(500, err);
  })
  .done(function() {

  });

}

exports.destroy = function(req, res) {

  var user_id = req.params.user_id;
  var message_id = req.params.id;
  function getUser(user_id) {
      var foundUser;
      return Q(User.findById(user_id).exec())
          .then(function(user) {
              foundUser = user;
              return foundUser;
          })
  };

  getUser(user_id)
  .then(function(user) {
    var removed = false;
    for(var i = 0; i < user.messages.length; i++) {
      if(user.messages[i] == null) {
        user.messages.splice(i,1);
      }
    }
    for(var i = 0; i < user.messages.length; i++) {
      if(user.messages[i]._id == message_id) {
        user.messages.splice(i,1);
        removed = true;
        break;
      }
    }

    user.save();
    if (removed) {
      res.json(200, 'message removed');
    } else {
      res.json(404, 'could not find the message');
    }

  })
  .catch(function(err) {
      res.json(500, "Could not remove the message");
  })
  .done(function() {

  });
}
