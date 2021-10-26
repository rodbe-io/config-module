/* eslint-disable no-process-exit, @typescript-eslint/no-var-requires */
const chalk = require('chalk');

const done = (msg = '', lbl = '') => {
  console.log(`🚀  ${chalk.bgGreenBright.bold.white(' [ DONE ] ' + lbl + ': ')} ${msg}`);
};

const error = (msg = '', lbl = '') => {
  console.log(`❌  ${chalk.bgRedBright.bold.white(' [ ERROR ] ' + lbl + ': ')} ${msg}`);
};

const info = (msg = '', lbl = '') => {
  console.log(`💡  ${chalk.bgBlueBright.bold.white(' [ INFO ] ' + lbl + ': ')} ${msg}`);
};

const log = (msg = '', lbl = '') => {
  console.log(`👉  ${chalk.bgBlack.bold.white(' [ LOG ] ' + lbl + ': ')} ${msg}`);
};

const warning = (msg = '', lbl = '') => {
  console.log(`⚠️  ${chalk.bgYellow.bold.white(' [ WARNING ] ' + lbl + ': ')} ${msg}`);
};

const actions = { done, error, info, log, warning };
const [_, __, type, message, label] = process.argv;
(actions[type] || actions.log)(cleanNulleables(message), cleanNulleables(label));

// utils

function cleanNulleables(text) {
  return [null, undefined, 'null', 'undefined'].includes(text) ? '' : text;
}
