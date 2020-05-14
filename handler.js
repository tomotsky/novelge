'use strict';

const pug = require('pug');
const fs = require('fs');
const scenario = require('./scenario');

let username = '';

function startView(req, res) {
  if ((req.method) === 'GET') {
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
  //req.urlで数字を取得
  const viewNum = parseInt((req.url).replace('/', ''));
  console.log(req.url);
  console.log(viewNum);
  // 数字のシーンを取得して渡す
  const scene = scenario.getScene(viewNum, username);
  if (scene !== null) {
    res.end(pug.renderFile('./views/mainview.pug', {
      username: username,
      image: fs.readFileSync(`./image/${scene.image}`),
      message: scene.message,
      answers: scene.answers,
      end: scene.end
    }));
  } else {
    notFound(req, res);
  }
  // console.log(username);
}

function favicon(req, res) {
  res.writeHead(200, {
    'Content-Type': 'image/vnd.microsoft.icon'
  });
  //const favicon = fs.readFileSync('./favicon.ico');
  //res.end(favicon);
  res.end();
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
  favicon,
  notFound
}