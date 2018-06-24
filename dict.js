const resources = { '/IP': 'Internet Protocol', '/TCP': 'Transmission Control Protocol' };
const textBody = require('body');
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  let body;
  if (req.method === 'GET') {
    if (resources[req.url] === undefined) {
      res.statusCode = 404;
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      body = resources[req.url];
    }
  } else if (req.method === 'PUT') {
    res.statusCode = 201;
    textBody(req, res, (err, requestBody) => {
      resources[req.url] = requestBody;
      const responseBody = resources[req.url];
      res.end(responseBody);
    });
  }
  res.end(body);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
