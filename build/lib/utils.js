const path = require('path');

let cwd = path.resolve(process.cwd());

module.exports = {
  cwd,
  resolve(url) {
    return path.resolve(cwd, url);
  }
};