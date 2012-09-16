var express = require('express');
var fs   = require('fs');
var idgen = require('./idgenerator');
var url = require('url');
var twitter = require('ntwitter');

var twit = new twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

var ipAddress = {}

var app = express();

app.configure(function() {
});

app.get('/', function(req, res) {
	var reqIp = req.connection.remoteAddress;
	ipAddress[reqIp] = reqIp;
	res.writeHead(200, {'Content-Type': 'text/html'});
	var rs = fs.readFileSync(__dirname + '/views/index.html').toString().replace('getmeahandle', idgen.getId());
	res.write(rs);
	res.end();
});

app.get('/css/bootstrap.css', function(req, res) {
	console.log('/bootstrap requested');
	res.writeHead(200, {'Content-Type': 'text/css'});
	var rs = fs.readFileSync(__dirname + '/css/bootstrap.css').toString();
	res.write(rs);
	res.end();
});

app.get('/id', function(req, res) {
	var generatedId = idgen.getId();
	var time = new Date().getTime();
	twit.get('/users/show.json', {screen_name: generatedId}, function(data) {
		console.log('Time taken: ' + (new Date().getTime() - time));
		res.writeHead(200, {'Content-Type': 'text/plain'});
		var yesNo = (data == null) ? 'No' : 'Yes';
		var retValue = {id: generatedId, isAvailable: yesNo};
		res.write(JSON.stringify(retValue));
		res.end();
	});
});

app.get('/ipaddress', function(req, res) {
	console.log('getting ipaddress');
	var allValues = "List of IPAddress are:";
	for (var key in ipAddress)  allValues = allValues + "\n" + key;
	res.end(allValues);
});

var port = process.env.PORT || 5000;
console.log('Listening on port: ' + port);
app.listen(port);