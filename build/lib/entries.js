const glob = require('glob');
const path = require('path');
const utils = require('./utils');

let entriesObj = {};
let entriesArr = glob.sync(`${utils.cwd}/src/js/**/*.js`);

let jsDirLen = path.join(`${utils.cwd}/src/js/`).length;

entriesArr.forEach((entry) => {
  let jsName = entry.substring(jsDirLen, entry.lastIndexOf('.'));
  entriesObj[jsName] = entry;
});

module.exports = entriesObj;
