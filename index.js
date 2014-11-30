var http = require('http');
var fs   = require('fs');
var jade = require('jade');

var server = http.createServer();

function renderStylesheet(response) {
  response.writeHead(200, {
    "Content-Type": "text/css"
  });

  fs.createReadStream('public/stylesheets/application.css').
    pipe(response);
}

function renderPage(response) {
  response.writeHead(200, {
    "Content-Type": "text/html"
  });

  response.end(jade.renderFile('views/index.jade'));
}

function renderScript(response) {
  response.writeHead(200, {
    "Content-Type": "application/javascript"
  });

  fs.createReadStream("public/javascripts/application.js").
    pipe(response);
}


server.on('request', function(request, response) {
  if (request.url == "/") {
    renderPage(response);
  } else if (request.url == "/application.css") {
    renderStylesheet(response);
  } else if (request.url == "/application.js") {
    renderScript(response);
  } else {
    response.writeHead(404);
    response.end();
  }
});

server.listen(8080);
