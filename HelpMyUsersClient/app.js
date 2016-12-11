
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');
var mongo = require("./routes/mongo");
var mainLogic = require('./routes/mainLogic');
var analytics = require('./routes/analytics');

var guidedTours = require('./routes/guidedTours');

var mongoConnectURL = "mongodb://pavanshah77:pavanshah77@ds129028.mlab.com:29028/helpmyusersdatabase";


var app = express();

// all environments
/*app.set('port', process.env.PORT || 3000);*/
app.set('views', __dirname + '/views');
//app.set('view engine', 'ejsapp.use(express.favicon());');

app.set('view engine', 'ejs');
app.use(express.favicon());

app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', mainLogic.loadHomePage);
app.get('/analytics', mainLogic.analytics);
app.post('/clicksData', analytics.fetchClicksData);
app.post('/captureClick', analytics.captureClicksData);
app.post('/loadURL', guidedTours.loadImage);
app.post('/publishGuidedTour', guidedTours.publishGuidedTour);

mongo.connect(mongoConnectURL, function(){
  console.log('Connected to mongo at: ' + mongoConnectURL);
/*  http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  });*/ 
});



//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/')));


var cfenv = require('cfenv');

var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, appEnv.bind, function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});