conferences = require('../controllers/conferencesController'),

module.exports = function(app){

  app.get('/api/conferences', conferences.index);
  app.get('/api/conferences/:id', conferences.show);
  app.post('/api/conferences', conferences.create);
  app.put('/api/conferences/:id', conferences.update);
  app.del('/api/conferences/:id', conferences.destroy);
  app.del('/api/deleteallconferences', conferences.deleteAllConferences);

}
