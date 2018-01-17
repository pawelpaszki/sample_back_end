messages = require('../controllers/messagesController'),

module.exports = function(app){

  app.post('/api/users/:user_id/messages', messages.create);
  app.put('/api/users/:user_id/messages', messages.update);
  app.get('/api/users/:user_id/messages/delete/:id', messages.destroy);
  app.get('/api/users/:user_id/messages', messages.show);
  app.get('/api/users/:user_id/unread', messages.unread);
  app.get('/api/users/:user_id/messages/:sender_id', messages.showConversation);
}
