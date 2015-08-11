var express = require('express');
var http = require('http');
var query = require('./MongodbEngine.js');

var app = express();
module.exports = app;


app.use(express.bodyParser());

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));

  app.engine('html', require('hbs').__express);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
});

query.connect(function(err) {
  if (err) {
    console.log(err);
  } else {
    http.createServer(app).listen(app.get('port'), function() {
      console.log("Express server listening on port " + app.get('port'));
    });
  }
});


var home = require('./controllers/home.js')({
  app: app
});
