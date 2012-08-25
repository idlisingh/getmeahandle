var express = require('express');
var fs   = require('fs');
var idgen = require('./idgenerator');
var url = require('url');

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

app.get('/id', function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write(idgen.getId());
	res.end();
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
