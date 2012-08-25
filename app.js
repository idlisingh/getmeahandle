var http = require('http');
var fs   = require('fs');
var idgen = require('./idgenerator');
var url = require('url');
var io = require('socket.io')


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
	}else if (pathname == '/id') {
		console.log('Getting Id');
		return response.end(idgen.getId());
	}

	var reqIp = request.connection.remoteAddress;
	ipAddress[reqIp] = reqIp;

	response.writeHead(200, {'Content-Type': 'text/html'});
	var rs = fs.readFileSync(__dirname + '/index.html').toString().replace('sample_id', idgen.getId());
	response.write(rs);
	response.end();
});


var socket = io.listen(server);

socket.configure('production', function () { 
  socket.set("transports", ["xhr-polling"]); 
  socket.set("polling duration", 0.5); 
});

socket.sockets.on('connection', function (client) {
	client.on('reqnewid', function(data) {
		console.log(data);
		client.emit('newid', idgen.getId());
	});
});

var port = process.env.PORT || 5000;
console.log('Listening on port: ' + port);
server.listen(port);
