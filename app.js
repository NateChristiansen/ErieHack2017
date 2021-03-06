/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com



/*
Developed by: Nate Christansen and Cameron Makin
For: Erie Insurance 2017 Hackathon (IoT Group)
Date: 6/9/2017
File: app.js

Developer Note: We wanted to utilize IBM Bluemix, unfortunatly we could not find time to make our project public...
...so everything must be run locally

Special thanks to IBM Engineers for helping our team out with the email messageing functionality in this app (in app.js, joehavey.html, and Sitter.html).
Additional credit goes to stackoverflow and w3schools (accessed via Google Search) for additional support.
*/


var fs = require('fs');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

var db = require("./db.json");//Our JSON Data

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

router.get('/Sitter', function(req, res, next){
	res.sendFile(__dirname + "/public/Sitter.html");
});

router.get('/Sitter2', function(req, res, next){
        res.sendFile(__dirname + "/public/Sitter2.html");
      });      

router.get('/joevahey', function(req, res, next){
	res.sendFile(__dirname + "/public/joevahey.html");
});

router.get('/joevahey2', function(req, res, next){
  res.sendFile(__dirname + "/public/joevahey2.html");
});



router.post('/savedatabase', function(req,res,next){
	console.log(req.body);
	fs.writeFile('db.json', JSON.stringify(db));
});

//Email Messages
router.post('/breakInMessage', function(req, res) {
	try {
		var message = req.body; 
		var transporter = nodemailer.createTransport('smtps://eriesmart2017:hackathon2017@smtp.gmail.com');
		var options = {
			from: '"Erie Smart" <eriesmart2017@gmail.com>',
			to: 'cammakin8@gmail.com',
			subject: 'ERIE Smart Alert',
			text: "A break in was detected for Josh Sitter at his 2568 Washington Ave Residence. Please follow up with the named insured as soon as possible."
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

router.post('/smokeAlarmMessage', function(req, res) {
	try {
		var message = req.body; 
		var transporter = nodemailer.createTransport('smtps://eriesmart2017:hackathon2017@smtp.gmail.com');
		var options = {
			from: '"Erie Smart" <eriesmart2017@gmail.com>',
			to: //'yostjmv@gmail.com',
			subject: 'ERIE Smart Alert',
			text: 'The carbon monoxide alarm has been activated for Joe Vahey at his 1478 Brown Rd Residence. Please follow up with the named insured as soon as possible.'
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
