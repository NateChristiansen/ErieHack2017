/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var fs = require('fs');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

var db = require("./db.json");

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.get('/customers', function(req, res, next) {
  res.send(db);
});

router.get('/', function(req, res, next) {
	res.sendFile(__dirname + "/public/index.html");
});

router.get('/dashboard', function(req, res, next) {
	res.sendFile(__dirname + "/public/Dashboard.html");
});

router.get('/cammakin', function(req, res, next){
	res.sendFile(__dirname + "/public/CamMakin.html");
});

router.get('/cleolouis', function(req, res, next){
	res.sendFile(__dirname + "/public/CamMakin.html");
});


router.get('/joshsitter', function(req, res, next){
	res.sendFile(__dirname + "/public/CamMakin.html");
});

router.get('/jordynheweo', function(req, res, next){
	res.sendFile(__dirname + "/public/CamMakin.html");
});


router.post('/savedatabase', function(req,res,next){
	console.log(req.body);
	fs.writeFile('db.json', JSON.stringify(db));
});

router.post('/message', function(req, res) {
	try {
		var message = req.body;
		var transporter = nodemailer.createTransport('smtps://eriesmart2017:hackathon2017@smtp.gmail.com');
		var options = {
			from: '"Erie Smart" <eriesmart2017@gmail.com>',
			to: 'natechristiansen42@gmail.com',
			subject: 'test',
			text: 'test'
		};
		transporter.sendMail(options, function(error, info){
			if (error) {
				res.send('Failure');
			}
			res.send('Sent');
		});
	}
	catch(err) {
		res.send(JSON.stringify(err.message));
	}
});

app.use('/', router);

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});