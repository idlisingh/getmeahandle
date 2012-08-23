var http = require('http');
var fs   = require('fs');
var idgen = require('./idgenerator');
var url = require('url');

var ipAddress = {}

var server = http.createServer(function(request, response) {
	var pathname = url.parse(request.url).pathname;
	if (pathname == '/favicon.ico') {
		response.end();
		return;
	}else if (pathname == '/ipaddress') {
		var allValues = "List of IPAddress are:";
		for (var key in ipAddress)  allValues = allValues + "\n" + key;
		response.end(allValues);
		return;
	}

	var reqIp = request.connection.remoteAddress;
	ipAddress[reqIp] = reqIp;

	response.writeHead(200, {'Content-Type': 'text/html'});
	var rs = fs.readFileSync(__dirname + '/index.html').toString().replace('idlisingh', idgen.getId());
	response.write(rs);
	response.end();
});

var port = process.env.PORT || 5000;
console.log('Listening on port: ' + port);
server.listen(port);
