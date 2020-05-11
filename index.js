'use strict';

const http = require('http');
const pug = require('pug');

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });

  if ((req.url) === '/' && (req.method) === 'GET') {
    res.write(pug.renderFile('./views/startpage.pug'));
    res.end();
  } else {
    res.write(pug.renderFile('./views/mainview.pug'));
    res.end();
  }

  switch (req.method) {
    case 'GET':
      break;
    case 'POST':
      let rawData = '';
      req.on('data', chunk => {
        rawData = rawData + chunk;
      }).on('end', () => {
        const qs = require('querystring');
        const decoded = decodeURIComponent(rawData);
        const username = qs.parse(decoded)['name'];
        res.end(username);
      });
      break;
    default:
      break;
  }
});

const port = 8000;
server.listen(port, () => {
  console.log('Listening on ' + port);
});