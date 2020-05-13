'use strict';

const http = require('http');
const handler = require('./handler');

const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      handler.startView(req, res);
      break;
    case '/favicon.ico':
      handler.favicon(req, res);
      break;
    default:
      if (parseInt((req.url).replace('/', ''))) {
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

const port = 8000;
server.listen(port, () => {
  console.log('Listening on ' + port);
});
