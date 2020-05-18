'use strict';

const http = require('http');
const fs = require('fs');
const handler = require('./handler');

const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      handler.startView(req, res);
      break;
    case '/views/style.css':
      res.writeHead(200, {
        "Content-Type": "text/css"
      });
      const data = fs.readFileSync('./views/style.css', 'UTF-8');
      res.end(data);
      break;
    case '/favicon.ico':
      res.writeHead(200);
      res.end();
      break;
    default:
      if (req.url.match(/image/)) {
        handler.readImage(req, res);
      } else if (parseInt((req.url).replace('/', ''))) {
        handler.storyView(req, res);
      } else {
        handler.notFound(req, res);
      }
      break;
  }
}).on('error', e => {
  console.error('Server Error', e);
}).on('clientError', e => {
  console.error('Client Error', e);
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log('Listening on ' + port);
});
