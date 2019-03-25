const chalk = require('chalk');

let log = {};
let _map = {
  warn: 'yellow',
  success: 'green',
  error: 'red'
};

Object.keys(this._map).forEach((level) => {
  log[level] = (str) => {
    console.log(chalk[this._map[level]](str));
  }
});

module.exports = log;