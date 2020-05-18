'use strict';

const pug = require('pug');
const fs = require('fs');
const scenario = require('./scenario');

let username = '';

function startView(req, res) {
  if ((req.method) === 'GET') {
    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    res.end(pug.renderFile('./views/startpage.pug'));
  } else if ((req.method) === 'POST') {
    let rawData = '';
    req.on('data', chunk => {
      rawData = rawData + chunk;
    }).on('end', () => {
      const qs = require('querystring');
      const decoded = decodeURIComponent(rawData);
      username = qs.parse(decoded)['name'];
      res.writeHead(302, {
        Location: '/1'
      });
      res.end();
    });
  }
}

function storyView(req, res) {
  const viewNum = parseInt((req.url).replace('/', ''));
  const scene = scenario.getScene(viewNum, username);
  if (scene !== null) {
    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    res.end(pug.renderFile('./views/mainview.pug', {
      username: username,
      image: `./image/${scene.image}`,
      message: scene.message,
      answers: scene.answers,
      end: scene.end
    }));
  } else {
    notFound(req, res);
  }
}

function readImage(req, res) {
  res.writeHead(200, {
    "Content-Type": "image/jpeg"
  });
  const image = fs.readFileSync(`.${req.url}`, 'binary');
  res.end(image, 'binary');
}

function notFound(req, res) {
  res.writeHead(404, {
    'Content-Type': 'text/plain; charset=utf-8'
  });
  res.end('ページが見つかりません。');
}

module.exports = {
  startView,
  storyView,
  readImage,
  notFound
}