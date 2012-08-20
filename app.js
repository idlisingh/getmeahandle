var http = require('http');
var fs   = require('fs');
var idgen = require('./idgenerator');

var server = http.createServer(function(request, response) {
	response.writeHead(200, {'Content-Type': 'text/html'});
	var rs = fs.readFileSync(__dirname + '/index.html').toString().replace('idlisingh', idgen.getId());
	response.write(rs);
	response.end();
});

server.listen(51666);
