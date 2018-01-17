var mbaasApi = require('fh-mbaas-api');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mbaasExpress = mbaasApi.mbaasExpress();
var cors = require('cors');

function configureDB() {
  if(process.env.FH_ENV != null) {
    console.log("env mongo db" + process.env.FH_MONGODB_CONN_URL);
    return process.env.FH_MONGODB_CONN_URL;
  } else {
    return 'mongodb://localhost/testconference';
  }
}

mongoose.connect(configureDB());
console.log(configureDB());

// list the endpoints which you want to make securable here
var securableEndpoints = ['/api/authenticate', '/api/users', '/api/users/:id', '/api/signup', '/api/users/:user_id/conferences/:id', '/api/users/:user_id/messages', '/api/users/:user_id/messages/:id', '/api/users/:user_id/unread', '/api/users/:user_id/messages/:sender_id', '/api/conferences', '/api/conferences/:id', '/api/users/delete/:id'];

var app = express();

// Enable CORS for all requests
app.use(cors());

// Note: the order which we add middleware to Express here is important!
app.use('/sys', mbaasExpress.sys(securableEndpoints));
app.use('/mbaas', mbaasExpress.mbaas);

/* uncomment this code if you want to use $fh.auth in the app preview
 * localAuth is only used for local development.
 * If the app is deployed on the platform,
 * this function will be ignored and the request will be forwarded
 * to the platform to perform authentication.

app.use('/box', mbaasExpress.auth({localAuth: function(req, cb){
  return cb(null, {status:401, body: {"message": "bad request"}});
}}));

or

app.use('/box', mbaasExpress.core({localAuth: {status:401, body: {"message": "not authorised”}}}));
*/

// allow serving of static files from the public directory

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// Note: important that this is added just before your own Routes
app.use(mbaasExpress.fhmiddleware());

var routes = require('./routes'),
    http = require('http');

app.get('/', routes.index);

require('./routes/users')(app);
require('./routes/messages')(app);
require('./routes/conferences')(app);

// Important that this is last!
app.use(mbaasExpress.errorHandler());

var port = process.env.FH_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8002;
var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.listen(port, host, function() {
  console.log("App started at: " + new Date() + " on port: " + port);
});

module.exports = app;
