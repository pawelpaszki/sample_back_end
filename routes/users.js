users = require('../controllers/usersController'),

module.exports = function(app){

  app.get('/api/users', users.index);
  app.get('/api/users/:id', users.show);
  app.post('/api/signup', users.create);
  app.put('/api/users', users.markAllMsgsRead);
  app.put('/api/users/:id', users.update);
  app.get('/api/users/delete/:id', users.destroy);
  app.post('/api/authenticate', users.authenticate);
  app.put('/api/users/:user_id/conferences/:id', users.bookmark);
  app.del('/api/users/deleteallusers', users.deleteAllUsers);

}
