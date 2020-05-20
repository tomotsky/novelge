'use strict';

const scenario = [
  {id: 1, image: 'dummy.jpg', message: '${username}さん、ですか？', end: false,
    answers: [
      {answer: 'かわいいね', goto: 2},
      {answer: '名前を教えて', goto: 2},
      {answer: 'デートしようよ', goto: 2}
  ]},
  {id: 2, image: 'dummy.jpg', message: 'は？キモいんですけど。', end: true, answers:[]},
  {id: 999, image: 'dummy.jpg', message: '${username}さん、ですか？', end: false,
    answers: [
      {answer: '${username}1', goto: 1},
      {answer: '${username}2', goto: 2},
      {answer: '${username}3', goto: 3},
      {answer: '${username}4', goto: 4},
      {answer: '${username}5', goto: 5},
      {answer: '${username}6', goto: 6},
      {answer: '${username}7', goto: 7},
      {answer: '${username}8', goto: 8},
      {answer: '${username}9', goto: 999}
  ]}
];

function getScene(n, username) {
  let result = {};
  for (const scene of scenario) {
    if (scene.id === n) {
      result = JSON.parse(JSON.stringify(scene)); 
      result.message = scene.message.replace('${username}', username);
      if (scene.end) {
        result.answers = [];
        result.answers.push({answer: '最初に戻る', goto: '/', textcolor: 'white', bgcolor: 'red'});
      } else {
        const bgcolors = ['peachpuff', 'paleturquoise', 'palegreen', 'pink', 'thistle'];
        for (let i = 0; i < result.answers.length; i++) {
          result.answers[i].answer = scene.answers[i].answer.replace('${username}', username);
          result.answers[i].bgcolor = bgcolors[i % bgcolors.length];
          result.answers[i].textcolor = 'black';
        }
      }
      return result;
    }
  }
  return null;
}

module.exports = { getScene };
