'use strict';

const scenario = [
  {id: 1, image: 'dummy.jpg', message: '#{username}さん、ですか？', end: false,
    answers: [
      {answer: 'かわいいね', goto: 2},
      {answer: '名前を教えて', goto: 2},
      {answer: 'デートしようよ', goto: 2}
  ]},
  {id: 2, image: 'dummy.jpg', message: 'は？キモいんですけど。', end: true}
];

function getScene(n) {
  for (const scene of scenario) {
    if (scene.id === n) { return scene; }
  }
}

module.exports = { getScene };
